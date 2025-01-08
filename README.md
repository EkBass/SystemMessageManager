Description is written by ChatGPT because it has much better English skills than i have :)

### **SystemMessageManager: Overview**

The `SystemMessageManager` is a Python/nodejs class designed to manage system messages in a structured and flexible way. These messages, which are organized by "roles," can be retrieved, modified, saved, and loaded as needed. The class ensures that a default system message is always preserved and provides features like backups for data integrity.

---

### **What It Does**

1. **Manage System Messages:**
   - Adds, edits, or removes system messages based on user-defined roles.
   - Protects the default system message from accidental deletion or modification.

2. **Backup and Restore:**
   - Automatically creates backups of current data when loading new data if the backup feature is enabled.
   - Restores data from JSON files, completely replacing the current state.

3. **Data Persistence:**
   - Saves system messages to JSON files for long-term storage.
   - Loads system messages from JSON files to quickly replace or update the current data.

4. **Customizable Settings:**
   - Allows toggling of the backup feature based on user preference.

---

### **How It Works**

1. **Initialization:**
   - When creating an instance of the class, you can either provide a JSON string or a default message. If a JSON string is provided, the data is loaded from it. Otherwise, the class initializes with a default system message.

2. **Adding Messages:**
   - New system messages can be added with a unique role. The default message is protected and cannot be overwritten.

3. **Retrieving Messages:**
   - You can fetch a system message by its role. If the role is not found, the default message is returned.

4. **Editing Messages:**
   - System messages can be edited, except for the default one. The role must already exist to make modifications.

5. **Saving and Loading:**
   - The current data can be saved as a JSON file.
   - When loading data from a file, the class optionally saves the current state as a backup before replacing the data.

6. **Backup Feature:**
   - By default, backups are enabled. If you load new data, the existing data is saved with a timestamped filename for safekeeping.

---

### **Key Features**

- **Ease of Use:** Intuitive methods (`add_system`, `get_system`, `edit_system`) make it simple to manage messages.
- **Data Integrity:** Backups ensure that no data is lost during file operations.
- **Flexibility:** Users can easily work with multiple system messages for different roles without interfering with the default message.
- **Persistence:** Data can be stored and restored using JSON files, making it portable and reusable.

---

### **Ideal Use Cases**

- Managing and updating system configurations or prompts in AI/automation workflows.
- Storing and retrieving context-specific messages for chatbots or applications.
- Safeguarding critical default settings while allowing customization.

LLM - SystemMessageManager
