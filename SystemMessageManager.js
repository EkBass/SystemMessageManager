/*
	SystemMessageManager
	Kristian Virtanen, krisu.virtanen@gmail.com
	MIT License.
	Version 1. 8th Jan 2025

	The SystemMessageManager is a nodejs/javascript class designed to manage system messages in a structured and flexible way.
	Messages are organized by "roles", can be retrieved, modified, saved, and loaded as needed.
	The class ensures that a default system message is always preserved and provides features like backups for data integrity.

	Example Usage:
	const SystemMessageManager = require('./SystemMessageManager');
	const manager = new SystemMessageManager("Default system message");
	manager.addSystem("custom_role", "This is a custom message.");
	console.log(manager.getSystem()); // "Default system message"
	console.log(manager.getSystem("custom_role")); // "This is a custom message."
	manager.editSystem("custom_role", "Updated custom message.");
	manager.saveSystem("system_data.json");
*/

const fs = require('fs');
const path = require('path');

class SystemMessageManager {
	// Constructor: Initialize the system with default or loaded data.
	constructor(initialData) {
		this.data = {};
		this.backup = true;

		// See if initial_data is a JSON string and load it
		try {
			const parsedData = JSON.parse(initialData);
			this.data = parsedData;
		} catch {
			// Or init with a default system message
			this.data["default"] = { role: "default", content: initialData };
		}
	}

	// Adds a new system message while protecting the default message
	addSystem(role, content) {
		if (this.data[role]) {
			return "Error: System message with this role already exists.";
		} else {
			this.data[role] = { role, content };
		return true;
	}
  }

	/* Returns the system message content for the given role.
       If role is not provided or on a error a default is returned */
	getSystem(role = null) {
		if (role && this.data[role]) {
			return this.data[role].content;
		}
		return this.data["default"].content;
	}

	/* Edits a system message
       Protects the default one */
	editSystem(role, newContent) {
		if (this.data[role] && role !== "default") {
			this.data[role].content = newContent;
			return true;
		}
		return false;
	}

	// Saves the current system data to a JSON file
	saveSystem(filename) {
		if (!filename.endsWith('.json')) {
			return "Error: Filename must have a .json extension.";
		}
		try {
			fs.writeFileSync(filename, JSON.stringify(this.data, null, 4));
			return true;
		} catch (error) {
			return `Error saving file: ${error.message}`;
		}
	}

	/* Loads data from a file, replacing all current data, including the default message.
	   So kind of "reboot for whole class
       If backup is enabled, saves the current state before loading. */
	loadSystem(filename) {
		if (this.backup) {
			const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
			const backupFilename = `${timestamp}-backup.json`;
			this.saveSystem(backupFilename);
		}

		try {
			const fileData = fs.readFileSync(filename, 'utf-8');
			this.data = JSON.parse(fileData);
			return true;
		} catch (error) {
			return `Error loading file: ${error.message}`;
		}
	}

	// Switch backup with this.
	switchBackup(status) {
		this.backup = Boolean(status);
	}

	// Returns the current backup status
	getBackup() {
		return this.backup;
	}
}

module.exports = SystemMessageManager;
