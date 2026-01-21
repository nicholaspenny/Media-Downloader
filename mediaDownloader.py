import sys
import os
from pathlib import Path
import subprocess
import pyperclip # type: ignore
import ctypes
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer  

# ---------- CONFIG ----------
SAVE_PATH = '' # use to set downloads folder
STOP_PORT = 45678
STOP_KEYWORD = "MD_KILL" # used to abort all downloads & end processes

MAX_AUDIO_DURATION = 3600 # default max length for audio (1hr)
MAX_VIDEO_DURATION = 7200 # default max length for video (3hr)


# ---------- HELPERS ----------
def show_error(message):
    """Creates a Windows popup box for errors"""
    # 0x10 is the icon for "Critical Error"
    ctypes.windll.user32.MessageBoxW(0, message, "Download Error", 0x10)

def get_download_folder() -> str:
    home = Path.home()
    downloads = home / "Downloads"

    if downloads.exists() and downloads.is_dir():
        base = downloads / "Media Downloader"
    else:
        base = home / "Media Downloader"
    base.mkdir(parents=True, exist_ok=True)

    return str(base)


MD_FOLDER = SAVE_PATH or get_download_folder()


def open_download_folder():
    import time
    time.sleep(1)  # 0.5 seconds, adjust if needed
    
    try:
        os.startfile(MD_FOLDER) # open file explorer to set folder
    except Exception as e:
        show_error(f"Cannot open folder: {e}")


# ---------- KILL ALL ----------
def kill_all():
    subprocess.run(
        ["taskkill", "/IM", "yt-dlp.exe", "/F", "/T"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    
    # Kill all instances of this script
    exe_name = os.path.basename(sys.executable)
    subprocess.run(
        ["taskkill", "/IM", exe_name, "/F", "/T"],
        stdout=subprocess.DEVNULL, 
        stderr=subprocess.DEVNULL)


# ---------- STOP CLASS/METHODS ----------
class StopHandler(BaseHTTPRequestHandler):

    def do_POST(self):
        if self.path == "/stop":
            kill_all()
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def log_message(self, *_):
        pass


def start_stop_server():
    try:
        HTTPServer(("127.0.0.1", STOP_PORT), StopHandler).serve_forever()
    except OSError:
        pass  # already running


# ---------- DOWNLOAD ----------
def run_download(cmd):
    try:
        startupinfo = subprocess.STARTUPINFO()
        startupinfo.dwFlags |= subprocess.STARTF_USESHOWWINDOW

        # Run yt-dlp and capture output
        result = subprocess.run(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            startupinfo=startupinfo
        )

        if result.returncode == 101:
            show_error(
                f"yt-dlp blocked the download.\n\n"
                f"Ensure:\n"
                f"- Not a livestream\n"
                f"- Audio Duration <= {MAX_AUDIO_DURATION/60.0} min\n"
                f"- Video Duration <= {MAX_VIDEO_DURATION/60.0} min"
            )
        elif result.returncode != 0:
            show_error(f"yt-dlp failed:\n\n{result.stderr}")
        else:
            open_download_folder()
    except Exception as e:
        show_error(str(e))


def download():
    clipboard = pyperclip.paste().strip()

    if clipboard.upper() == STOP_KEYWORD:
        kill_all()
        return
    
    # attempt to get URL from arguments first
    mode = "mp3"
    if len(sys.argv) > 1:
        raw_arg = sys.argv[1]
        if raw_arg.startswith("mydl:video+"):
            mode = "mp4"
            url = raw_arg.replace("mydl:video+", "").strip()
        else:
            url = raw_arg.replace("mydl:", "").strip()
    else:
        # otherwise, use clipboard
        print("No URL provided. Checking clipboard...")
        url = clipboard

    if not url:
        show_error("No URL provided.")
        return

    print(f"Processing [{mode}]: {url}")

    if mode == "mp4":
        # Video Settings (MP4 best video available)
        dl_args = [
            "-f", "bv+ba[ext=m4a]",
            "--merge-output-format", "mp4",
            "--break-match-filter", "!is_live & duration <= 7200"
        ]
    elif mode == "mp3":
        # Audio Settings (MP3 best audio available)
        dl_args = [
            "-f", "ba[ext=m4a]",
            "-x",
            "--audio-format", "mp3",
            "--break-match-filter", "!is_live & duration <= 3600"
        ]

    cmd = [
        "yt-dlp",
        "-P", MD_FOLDER,
        *dl_args,
        "--break-match-filter", "!is_live & !duration",
        "--no-playlist",
        "--playlist-items", "1",
        url
    ]
    
    run_download(cmd)


if __name__ == "__main__":
    # Start STOP server
    threading.Thread(
        target=start_stop_server,
        daemon=True
    ).start()

    download()