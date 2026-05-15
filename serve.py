#!/usr/bin/env python3
import http.server
import json
import re
import os
from datetime import datetime, timezone

TICKETS_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tickets.json')
PORT = 8080


def load():
    with open(TICKETS_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def save(data):
    with open(TICKETS_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=True)


def read_body(handler):
    length = int(handler.headers.get('Content-Length', 0))
    return json.loads(handler.rfile.read(length)) if length else {}


def send_json(handler, code, obj):
    body = json.dumps(obj).encode()
    handler.send_response(code)
    handler.send_header('Content-Type', 'application/json')
    handler.send_header('Content-Length', str(len(body)))
    handler.end_headers()
    handler.wfile.write(body)


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_PATCH(self):
        try:
            body = read_body(self)
            data = load()

            m = re.match(r'^/api/tickets/(T-\d+)$', self.path)
            if m:
                for t in data['tickets']:
                    if t['id'] == m.group(1):
                        if 'status' in body:
                            t['status'] = body['status']
                            if body['status'] == 'done' and not t.get('completed_at'):
                                t['completed_at'] = datetime.now(timezone.utc).isoformat()
                            elif body['status'] != 'done':
                                t['completed_at'] = None
                        save(data)
                        return send_json(self, 200, t)
                return send_json(self, 404, {'error': 'ticket not found'})

            m = re.match(r'^/api/projects/(P-\d+)$', self.path)
            if m:
                for p in data['projects']:
                    if p['id'] == m.group(1):
                        if 'status' in body:
                            p['status'] = body['status']
                        save(data)
                        return send_json(self, 200, p)
                return send_json(self, 404, {'error': 'project not found'})

            send_json(self, 404, {'error': 'not found'})
        except Exception as e:
            send_json(self, 500, {'error': str(e)})

    def do_POST(self):
        try:
            body = read_body(self)
            data = load()

            m = re.match(r'^/api/tickets/(T-\d+)/feedback$', self.path)
            if m:
                for t in data['tickets']:
                    if t['id'] == m.group(1):
                        note_text = body.get('note', '').strip()
                        if not note_text:
                            return send_json(self, 400, {'error': 'note is required'})
                        note = {
                            'date': datetime.now(timezone.utc).isoformat(),
                            'note': note_text,
                        }
                        t.setdefault('feedback', []).append(note)
                        save(data)
                        return send_json(self, 201, note)
                return send_json(self, 404, {'error': 'ticket not found'})

            send_json(self, 404, {'error': 'not found'})
        except Exception as e:
            send_json(self, 500, {'error': str(e)})

    def log_message(self, fmt, *args):
        print(f'  {self.address_string()} [{self.log_date_time_string()}] {fmt % args}')


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)) or '.')
    server = http.server.HTTPServer(('', PORT), Handler)
    print(f'  Sauzi dev server → http://localhost:{PORT}')
    print(f'  Tickets UI       → http://localhost:{PORT}/tickets.html')
    print()
    server.serve_forever()
