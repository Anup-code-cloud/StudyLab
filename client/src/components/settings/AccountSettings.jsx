import React from "react";

export default function AccountSettings() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Account</h2>
      <div className="space-y-6">

        {/* Privacy */}
        <div>
          <h3 className="font-medium">Privacy</h3>
          <ul className="space-y-2 mt-2">
            <li className="flex justify-between">
              <span>Last Seen & Online</span>
              <select className="border rounded px-2 py-1">
                <option>Everyone</option>
                <option>My Contacts</option>
                <option>Nobody</option>
              </select>
            </li>
            <li className="flex justify-between">
              <span>Profile Photo</span>
              <select className="border rounded px-2 py-1">
                <option>Everyone</option>
                <option>My Contacts</option>
                <option>Nobody</option>
              </select>
            </li>
            <li className="flex justify-between">
              <span>Status</span>
              <select className="border rounded px-2 py-1">
                <option>Everyone</option>
                <option>My Contacts</option>
                <option>Nobody</option>
              </select>
            </li>
          </ul>
        </div>

        {/* Security */}
        <div>
          <h3 className="font-medium">Security</h3>
          <p className="text-sm text-gray-500 mt-2">
            Enable additional protection for your chats and account.
          </p>
          <label className="flex items-center justify-between mt-2">
            <span>Two-step verification</span>
            <input type="checkbox" />
          </label>
          <label className="flex items-center justify-between mt-2">
            <span>Fingerprint lock</span>
            <input type="checkbox" />
          </label>
        </div>

        {/* Linked Devices */}
        <div>
          <h3 className="font-medium">Linked Devices</h3>
          <button className="px-3 py-1 mt-2 rounded bg-green-500 text-white">
            Manage Devices
          </button>
        </div>

      </div>
    </div>
  );
}
