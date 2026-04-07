#!/usr/bin/env python3
import http.server
import socketserver
import os

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # If path ends with /, serve index.html
        if self.path.endswith('/'):
            self.path += 'index.html'
        return super().do_GET()

os.chdir('/Users/akashchatake/Downloads/Projects/Apollo/apollo-website')
PORT = 8080
Handler = MyHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 Apollo Website running on http://localhost:{PORT}")
    print(f"📍 Serving from: {os.getcwd()}")
    httpd.serve_forever()
