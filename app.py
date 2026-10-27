from flask import Flask, render_template, jsonify, request
from config import Config
import os

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Ensure uploads directory exists
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    @app.context_processor
    def inject_app_metadata():
        return {
            'app_name': app.config['APP_NAME'],
            'app_tagline': app.config['APP_TAGLINE'],
        }

    @app.route('/')
    def index():
        # Summary data for the welcome dashboard view
        stats = {
            'total_documents': 0,
            'storage_used': '0.00 MB',
            'recent_uploads': 0,
            'categories': 4
        }
        return render_template('index.html', stats=stats)

    @app.route('/api/status')
    def api_status():
        return jsonify({
            'status': 'online',
            'version': '1.0.0',
            'system': 'DocuFlow Document Management Platform'
        })

    return app

app = create_app()

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
