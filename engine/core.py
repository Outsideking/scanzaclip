import datetime
import os

def execute():
    now = datetime.datetime.now()
    os.makedirs("logs", exist_ok=True)
    with open("logs/system.log", "a") as f:
        f.write(f"Execution at {now}\n")
    return f"Executed at {now}"
