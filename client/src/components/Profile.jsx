import React, { useState } from "react";
import {
  User,
  Lock,
  MessageSquare,
  Bell,
  Database,
  HelpCircle,
  Info,
  Monitor,
  Palette,
  Video,
  Folder,
  Keyboard,
  ChevronRight,
  Search,
  Sun,
  Moon,
  Smartphone,
  Shield,
  Languages,
  LogOut,
  Eye,
  EyeOff
} from "lucide-react";

const menuItems = [
  { name: "General", icon: <Monitor className="w-5 h-5" /> },
  { name: "Account", icon: <User className="w-5 h-5" /> },
  { name: "Privacy", icon: <Lock className="w-5 h-5" /> },
  { name: "Chats", icon: <MessageSquare className="w-5 h-5" /> },
  { name: "Video & Voice", icon: <Video className="w-5 h-5" /> },
  { name: "Notifications", icon: <Bell className="w-5 h-5" /> },
  { name: "Personalization", icon: <Palette className="w-5 h-5" /> },
  { name: "Storage", icon: <Folder className="w-5 h-5" /> },
  { name: "Devices", icon: <Smartphone className="w-5 h-5" /> },
  { name: "Shortcuts", icon: <Keyboard className="w-5 h-5" /> },
  { name: "Help", icon: <HelpCircle className="w-5 h-5" /> },
  { name: "About", icon: <Info className="w-5 h-5" /> },
];

export default function WhatsappSettings() {
  const [active, setActive] = useState("General");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const filteredMenuItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`flex max-w-6xl mx-auto rounded-2xl shadow-2xl h-[700px] overflow-hidden ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Sidebar */}
      <div className={`w-1/4 border-r ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Settings</h2>
          <div className={`relative mt-3 ${darkMode ? "bg-gray-700" : "bg-gray-100"} rounded-lg`}>
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search settings"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2 pl-9 pr-3 ${darkMode ? "bg-gray-700 text-white placeholder-gray-400" : "bg-gray-100 text-gray-900 placeholder-gray-500"} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
            />
          </div>
        </div>
        
        <div className="overflow-y-auto h-[calc(100%-90px)]">
          {filteredMenuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center justify-between w-full px-4 py-3 text-left space-x-2 ${
                active === item.name 
                  ? darkMode 
                    ? "bg-green-800 font-medium text-white" 
                    : "bg-green-100 font-medium text-green-700"
                  : darkMode
                    ? "hover:bg-gray-700"
                    : "hover:bg-gray-200"
              }`}
            >
              <div className="flex items-center space-x-2">
                {item.icon}
                <span>{item.name}</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Content Panel */}
      <div className={`flex-1 p-6 overflow-y-auto ${darkMode ? "bg-gray-900" : "bg-white"}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{active}</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {active === "General" && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Appearance</h3>
              <div className="flex items-center justify-between py-2">
                <span>Theme</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{darkMode ? "Dark" : "Light"}</span>
                  <button 
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${darkMode ? "bg-green-600" : "bg-gray-300"}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Language</h3>
              <div className="flex items-center justify-between py-2">
                <span>App Language</span>
                <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
                  <option>System default</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Startup</h3>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p>Start WhatsApp at login</p>
                  <p className="text-sm text-gray-500">Open WhatsApp when you start your computer</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className={`w-11 h-6 rounded-full peer ${darkMode ? "bg-gray-700" : "bg-gray-300"} peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                </label>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Advanced</h3>
              <button 
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-green-600 font-medium flex items-center"
              >
                {showAdvanced ? "Hide advanced settings" : "Show advanced settings"}
                <ChevronRight className={`w-4 h-4 transform ${showAdvanced ? "rotate-90" : ""}`} />
              </button>
              
              {showAdvanced && (
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Hardware acceleration</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className={`w-11 h-6 rounded-full peer ${darkMode ? "bg-gray-700" : "bg-gray-300"} peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Auto-download updates</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className={`w-11 h-6 rounded-full peer ${darkMode ? "bg-gray-700" : "bg-gray-300"} peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {active === "Account" && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Profile</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
                  JD
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-gray-500">+1 (234) 567-8901</p>
                  <p className="text-sm text-gray-500">Hey there! I'm using WhatsApp.</p>
                </div>
              </div>
              <button className="mt-4 text-green-600 font-medium">Edit profile</button>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p>Two-step verification</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <button className="text-green-600 font-medium">Enable</button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p>Change passcode</p>
                    <p className="text-sm text-gray-500">Update your app security code</p>
                  </div>
                  <button className="text-green-600 font-medium">Change</button>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Account Actions</h3>
              <div className="space-y-4">
                <button className="flex items-center justify-between w-full py-2">
                  <span>Change number</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button className="flex items-center justify-between w-full py-2">
                  <span>Request account info</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button className="flex items-center justify-between w-full py-2 text-red-600">
                  <span>Delete account</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {active === "Privacy" && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Privacy Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p>Last seen & online</p>
                    <p className="text-sm text-gray-500">Everyone</p>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p>Profile photo</p>
                    <p className="text-sm text-gray-500">Everyone</p>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p>About</p>
                    <p className="text-sm text-gray-500">Everyone</p>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p>Status</p>
                    <p className="text-sm text-gray-500">My contacts</p>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p>Read receipts</p>
                    <p className="text-sm text-gray-500">Enabled</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className={`w-11 h-6 rounded-full peer ${darkMode ? "bg-gray-700" : "bg-gray-300"} peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Blocked Contacts</h3>
              <p className="text-sm text-gray-500 mb-3">You have 2 blocked contacts</p>
              <button className="text-green-600 font-medium">Manage blocked contacts</button>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Advanced</h3>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p>Disappearing messages</p>
                  <p className="text-sm text-gray-500">Default duration: Off</p>
                </div>
                <ChevronRight className="w-4 h-4" />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <p>Groups</p>
                  <p className="text-sm text-gray-500">Everyone</p>
                </div>
                <ChevronRight className="w-4 h-4" />
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div>
                  <p>Calls</p>
                  <p className="text-sm text-gray-500">Silence unknown callers</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className={`w-11 h-6 rounded-full peer ${darkMode ? "bg-gray-700" : "bg-gray-300"} peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Other sections would follow similar patterns */}
        
        {active === "Chats" && (
          <div className="space-y-6">
            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Chat Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Enter is send</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className={`w-11 h-6 rounded-full peer ${darkMode ? "bg-gray-700" : "bg-gray-300"} peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Media visibility</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className={`w-11 h-6 rounded-full peer ${darkMode ? "bg-gray-700" : "bg-gray-300"} peer-checked:bg-green-600 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Font size</span>
                  <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">Backup</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p>Google Drive backup</p>
                  <p className="text-sm text-gray-500">Last backup: Yesterday at 18:42</p>
                </div>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <h3 className="font-medium text-lg mb-3">History</h3>
              <div className="space-y-4">
                <button className="flex items-center justify-between w-full py-2">
                  <span>Export chat</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button className="flex items-center justify-between w-full py-2 text-red-600">
                  <span>Clear all chats</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button className="flex items-center justify-between w-full py-2 text-red-600">
                  <span>Delete all chats</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {active === "Notifications" && <h2 className="text-lg font-semibold">Notifications</h2>}
        {active === "Storage" && <h2 className="text-lg font-semibold">Storage Management</h2>}
        {active === "Help" && <h2 className="text-lg font-semibold">Help & Support</h2>}
      </div>
    </div>
  );
}