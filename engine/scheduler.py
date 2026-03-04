import time
from engine.core import execute

def run_loop():
    while True:
        result = execute()
        print(result)
        time.sleep(60)
