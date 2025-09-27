import React from "react";

export default function GeneralSettings() {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">General</h2>
      <div className="space-y-6">
        {/* Login */}
        <div>
          <h3 className="font-medium">Login</h3>
          <label className="flex items-center justify-between mt-2">
            <span>Start WhatsApp at login</span>
            <input type="checkbox" />
          </label>
        </div>

        {/* Language */}
        <div>
          <h3 className="font-medium">Language</h3>
          <select className="mt-2 border rounded px-2 py-1">
            <option>System default</option>
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>

        {/* Typing */}
        <div>
          <h3 className="font-medium">Typing</h3>
          <p className="text-sm text-gray-500">
            Change typing settings from{" "}
            <a href="#" className="text-blue-600 underline">
              Windows Settings
            </a>
          </p>

          <label className="flex items-center justify-between mt-2">
            <span>Replace text with emoji</span>
            <input type="checkbox" defaultChecked />
          </label>

          <a href="#" className="text-sm text-blue-600 underline mt-1 inline-block">
            See list of text
          </a>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          To log out of studylab on this computer go to your{" "}
          <a href="#" className="text-blue-600 underline">
            Profile
          </a>.
        </p>
      </div>
    </div>
  );
}
