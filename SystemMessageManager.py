# SystemMessageManager
# Kristian Virtanen, krisu.virtanen@gmail.com
# MIT License.
# Version 1. 8th Jan 2025
#
# The SystemMessageManager is a Python class designed to manage system messages in a structured and flexible way.
# Messages are organized by "roles", can be retrieved, modified, saved, and loaded as needed.
# The class ensures that a default system message is always preserved and provides features like backups for data integrity.
#
# Example Usage:
# manager = SystemMessageManager("Default system message")
# manager.add_system("custom_role", "This is a custom system message.")
# print(manager.get_system())  # Returns "Default system message"
# print(manager.get_system("custom_role"))  # Should return "This is a custom system message"
# manager.edit_system("custom_role", "Updated custom message.")
# manager.save_system("system_data.json")

import json
import datetime

class SystemMessageManager:
    
    # Constructor: Initialize the system with default or loaded data.
    def __init__(self, initial_data):
        self.data = {}
        self.backup = True
        
        # See if initial_data is a JSON string and load it
        try:
            self.data = json.loads(initial_data)
        except json.JSONDecodeError:
            # Or inite with a default system message
            self.data["default"] = {"role": "default", "content": initial_data}
    
    def add_system(self, role, content):
        # Adds a new system message while protecting the default message
        if role in self.data:
            return "Error: System message with this role already exists."
        else:
            self.data[role] = {"role": role, "content": content}
            return True
    
    def get_system(self, role=None):
        # Returns the system message content for the given role.
        # If role is not provided or on a error a default is returned
        if role in self.data:
            return self.data[role]["content"]
        else:
            return self.data["default"]["content"]
    
    def edit_system(self, role, new_content):
        # Edits a system message
        # Protects the default one
        if role in self.data and role != "default":
            self.data[role]["content"] = new_content
            return True
        else:
            return False
    
    def save_system(self, filename):
        # Saves the current system datas to a JSON file.
        try:
            with open(filename, 'w') as json_file:
                json.dump(self.data, json_file, indent=4)
            return True
        except Exception as e:
            return f"Error saving file: {e}"
    
    def load_system(self, filename):
        # Loads data from a file, replacing all current data, including the default message.
        # So kind of "reboot for whole class
        # If backup is enabled, saves the current state before loading.

        if self.backup:
            # Save the current data with a timestamped filename
            timestamp = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
            backup_filename = f"{timestamp}-backup.json"
            self.save_system(backup_filename)
        
        try:
            with open(filename, 'r') as json_file:
                self.data = json.load(json_file)
            return True
        except Exception as e:
            return f"Error loading file: {e}"
    
    def switch_backup(self, status):
        # Switch backup with this.
        self.backup = bool(status)
    
    def get_backup(self):
        # If you forgot the backup status, here is method for it.
        return self.backup

