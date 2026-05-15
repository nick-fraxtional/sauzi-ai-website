#!/usr/bin/env python3
"""
UserPromptSubmit hook — injects ticket alert context into Claude when
any ticket is in-progress and has unactioned feedback.
"""
import json
import os
import sys

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tickets_file = os.path.join(root, 'tickets.json')

try:
    with open(tickets_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
except Exception:
    sys.exit(0)

actionable = [
    t for t in data.get('tickets', [])
    if t.get('status') in ('in-progress', 'in-review') and t.get('feedback')
]

if not actionable:
    sys.exit(0)

lines = [
    f"[TICKET ALERT] {len(actionable)} ticket(s) need attention:"
]
for t in actionable:
    last = t['feedback'][-1]
    lines.append(f"  {t['id']} [{t['status']}] ({t['page']}) — {t['title']}")
    lines.append(f"    Latest note: {last['note']}")

lines.append("")
lines.append(
    "Unless the user's message is clearly unrelated, action these tickets. "
    "For in-progress: apply changes and set status to in-review. "
    "For in-review: check the latest note — if it requests changes, apply them and keep in-review; if it approves, set to done."
)

print(json.dumps({
    "hookSpecificOutput": {
        "hookEventName": "UserPromptSubmit",
        "additionalContext": "\n".join(lines)
    }
}))
