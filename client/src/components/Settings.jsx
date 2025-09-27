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
  EyeOff,
  Download,
  Trash2,
  Wifi,
  WifiOff,
  Volume2,
  VolumeX,
  Image,
  Mic,
  MicOff,
  Camera,
  MessageCircle,
  Mail,
  Link,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Edit3,
  Save
} from "lucide-react";

// Main Component
export default function WhatsappSettings() {
  const [active, setActive] = useState("General");
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

        {active === "General" && <GeneralSettings darkMode={darkMode} />}
        {active === "Account" && <AccountSettings darkMode={darkMode} />}
        {active === "Privacy" && <PrivacySettings darkMode={darkMode} />}
        {active === "Chats" && <ChatsSettings darkMode={darkMode} />}
        {active === "Video & Voice" && <VideoVoiceSettings darkMode={darkMode} />}
        {active === "Notifications" && <NotificationsSettings darkMode={darkMode} />}
        {active === "Personalization" && <PersonalizationSettings darkMode={darkMode} />}
        {active === "Storage" && <StorageSettings darkMode={darkMode} />}
        {active === "Devices" && <DevicesSettings darkMode={darkMode} />}
        {active === "Shortcuts" && <ShortcutsSettings darkMode={darkMode} />}
        {active === "Help" && <HelpSettings darkMode={darkMode} />}
        {active === "About" && <AboutSettings darkMode={darkMode} />}
      </div>
    </div>
  );
}

// Toggle Switch Component
const Toggle = ({ enabled, setEnabled }) => (
  <button 
    onClick={() => setEnabled(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full ${enabled ? "bg-green-600" : "bg-gray-300"}`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`} />
  </button>
);

// General Settings
const GeneralSettings = ({ darkMode }) => {
  const [startAtLogin, setStartAtLogin] = useState(true);
  const [replaceEmoji, setReplaceEmoji] = useState(true);
  const [hardwareAcceleration, setHardwareAcceleration] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Appearance</h3>
        <div className="flex items-center justify-between py-2">
          <span>Dark Mode</span>
          <Toggle enabled={darkMode} setEnabled={() => {}} />
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
          <Toggle enabled={startAtLogin} setEnabled={setStartAtLogin} />
        </div>
      </div>

      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Typing</h3>
        <p className="text-sm text-gray-500 mb-3">
          Change typing settings for autocorrect and highlight from{" "}
          <a href="#" className="text-green-600 underline">Windows Settings</a>
        </p>

        <div className="flex items-center justify-between py-2">
          <span>Replace text with emoji</span>
          <Toggle enabled={replaceEmoji} setEnabled={setReplaceEmoji} />
        </div>

        <a href="#" className="text-sm text-green-600 underline mt-1 inline-block">
          See list of text shortcuts
        </a>
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
              <Toggle enabled={hardwareAcceleration} setEnabled={setHardwareAcceleration} />
            </div>
            
            <div className="flex items-center justify-between">
              <span>Auto-download updates</span>
              <Toggle enabled={autoUpdates} setEnabled={setAutoUpdates} />
            </div>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-6">
        To log out of WhatsApp on this computer go to your{" "}
        <a href="#" className="text-green-600 underline">Profile</a>.
      </p>
    </div>
  );
};

// Account Settings
const AccountSettings = ({ darkMode }) => {
  const [twoStepEnabled, setTwoStepEnabled] = useState(false);
  const [changeNumberModal, setChangeNumberModal] = useState(false);

  return (
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
        <button className="mt-4 text-green-600 font-medium flex items-center">
          <Edit3 className="w-4 h-4 mr-1" /> Edit profile
        </button>
      </div>

      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>Two-step verification</p>
              <p className="text-sm text-gray-500">Add an extra layer of security</p>
            </div>
            <button 
              onClick={() => setTwoStepEnabled(true)}
              className="text-green-600 font-medium"
            >
              {twoStepEnabled ? "Disable" : "Enable"}
            </button>
          </div>
          
          {twoStepEnabled && (
            <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <p className="text-sm text-green-700 dark:text-green-400">
                Two-step verification is enabled. You'll be asked for a PIN when registering your phone number with WhatsApp again.
              </p>
            </div>
          )}
          
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
          <button 
            onClick={() => setChangeNumberModal(true)}
            className="flex items-center justify-between w-full py-2"
          >
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

      {/* Change Number Modal */}
      {changeNumberModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`p-6 rounded-xl w-96 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className="font-bold text-lg mb-4">Change Number</h3>
            <p className="text-sm text-gray-500 mb-4">
              Your account and chat history will be moved to the new number.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Old number</label>
                <input 
                  type="tel" 
                  className={`w-full p-2 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100"}`}
                  value="+1 (234) 567-8901"
                  disabled
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">New number</label>
                <input 
                  type="tel" 
                  className={`w-full p-2 rounded border ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white border-gray-300"}`}
                  placeholder="Enter new phone number"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setChangeNumberModal(false)}
                className={`px-4 py-2 rounded ${darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                Cancel
              </button>
              <button 
                onClick={() => setChangeNumberModal(false)}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Privacy Settings
const PrivacySettings = ({ darkMode }) => {
  const [readReceipts, setReadReceipts] = useState(true);
  const [disappearingMessages, setDisappearingMessages] = useState(false);
  const [silenceUnknown, setSilenceUnknown] = useState(true);

  const privacyOptions = ["Everyone", "My contacts", "Nobody"];

  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>Last seen & online</p>
              <p className="text-sm text-gray-500">Everyone</p>
            </div>
            <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
              {privacyOptions.map(option => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p>Profile photo</p>
              <p className="text-sm text-gray-500">Everyone</p>
            </div>
            <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
              {privacyOptions.map(option => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p>About</p>
              <p className="text-sm text-gray-500">Everyone</p>
            </div>
            <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
              {privacyOptions.map(option => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p>Status</p>
              <p className="text-sm text-gray-500">My contacts</p>
            </div>
            <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
              {privacyOptions.map(option => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p>Read receipts</p>
              <p className="text-sm text-gray-500">Enabled</p>
            </div>
            <Toggle enabled={readReceipts} setEnabled={setReadReceipts} />
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
          <Toggle enabled={disappearingMessages} setEnabled={setDisappearingMessages} />
        </div>
        
        {disappearingMessages && (
          <div className="mt-2">
            <p className="text-sm font-medium mb-1">Default duration</p>
            <select className={`w-full p-2 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
              <option>24 hours</option>
              <option>7 days</option>
              <option>90 days</option>
            </select>
          </div>
        )}
        
        <div className="flex items-center justify-between py-2 mt-2">
          <div>
            <p>Groups</p>
            <p className="text-sm text-gray-500">Everyone</p>
          </div>
          <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
            <option>Everyone</option>
            <option>My contacts</option>
            <option>My contacts except...</option>
            <option>Nobody</option>
          </select>
        </div>
        
        <div className="flex items-center justify-between py-2">
          <div>
            <p>Calls</p>
            <p className="text-sm text-gray-500">Silence unknown callers</p>
          </div>
          <Toggle enabled={silenceUnknown} setEnabled={setSilenceUnknown} />
        </div>
      </div>
    </div>
  );
};

// Chats Settings
const ChatsSettings = ({ darkMode }) => {
  const [enterIsSend, setEnterIsSend] = useState(false);
  const [mediaVisibility, setMediaVisibility] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("Daily");

  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Chat Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Enter is send</span>
            <Toggle enabled={enterIsSend} setEnabled={setEnterIsSend} />
          </div>
          
          <div className="flex items-center justify-between">
            <span>Media visibility</span>
            <Toggle enabled={mediaVisibility} setEnabled={setMediaVisibility} />
          </div>
          
          <div className="flex items-center justify-between">
            <span>Font size</span>
            <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span>Wallpaper</span>
            <button className="text-green-600 font-medium">Change</button>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Backup</h3>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p>Google Drive backup</p>
            <p className="text-sm text-gray-500">Last backup: Yesterday at 18:42</p>
          </div>
          <button className="text-green-600 font-medium">Back up now</button>
        </div>

        <div className="flex items-center justify-between">
          <span>Back up to Google Drive</span>
          <select 
            value={backupFrequency}
            onChange={(e) => setBackupFrequency(e.target.value)}
            className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Off</option>
          </select>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span>Include videos</span>
          <Toggle enabled={true} setEnabled={() => {}} />
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
  );
};

// Video & Voice Settings
const VideoVoiceSettings = ({ darkMode }) => {
  const [noiseCancellation, setNoiseCancellation] = useState(true);
  const [lowDataUsage, setLowDataUsage] = useState(false);

  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Voice Calls</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>Noise cancellation</p>
              <p className="text-sm text-gray-500">Reduce background noise</p>
            </div>
            <Toggle enabled={noiseCancellation} setEnabled={setNoiseCancellation} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p>Low data usage</p>
              <p className="text-sm text-gray-500">Reduce data consumption during calls</p>
            </div>
            <Toggle enabled={lowDataUsage} setEnabled={setLowDataUsage} />
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Video Calls</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p>Low data usage</p>
              <p className="text-sm text-gray-500">Reduce data consumption during calls</p>
            </div>
            <Toggle enabled={lowDataUsage} setEnabled={setLowDataUsage} />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p>Camera</p>
              <p className="text-sm text-gray-500">Front camera</p>
            </div>
            <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
              <option>Front camera</option>
              <option>Back camera</option>
            </select>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Audio Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Microphone</span>
            <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
              <option>Default</option>
              <option>Microphone (2- Realtek Audio)</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Speakers</span>
            <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
              <option>Default</option>
              <option>Speakers (2- Realtek Audio)</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Ringtone</span>
            <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
              <option>Default</option>
              <option>Note</option>
              <option>Chime</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

// Notifications Settings
const NotificationsSettings = ({ darkMode }) => {
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [groupNotifications, setGroupNotifications] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [reactionNotifications, setReactionNotifications] = useState(true);

  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Message Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Message notifications</span>
            <Toggle enabled={messageNotifications} setEnabled={setMessageNotifications} />
          </div>
          
          {messageNotifications && (
            <>
              <div className="flex items-center justify-between">
                <span>Show preview</span>
                <Toggle enabled={showPreview} setEnabled={setShowPreview} />
              </div>
              
              <div className="flex items-center justify-between">
                <span>Reaction notifications</span>
                <Toggle enabled={reactionNotifications} setEnabled={setReactionNotifications} />
              </div>
              
              <div className="flex items-center justify-between">
                <span>Notification tone</span>
                <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
                  <option>Default (Note)</option>
                  <option>Chime</option>
                  <option>Hello</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <span>Vibrate</span>
                <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
                  <option>Default</option>
                  <option>Short</option>
                  <option>Long</option>
                  <option>Off</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Group Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Group notifications</span>
            <Toggle enabled={groupNotifications} setEnabled={setGroupNotifications} />
          </div>
          
          {groupNotifications && (
            <>
              <div className="flex items-center justify-between">
                <span>Show preview</span>
                <Toggle enabled={showPreview} setEnabled={setShowPreview} />
              </div>
              
              <div className="flex items-center justify-between">
                <span>Notification tone</span>
                <select className={`px-3 py-1 rounded ${darkMode ? "bg-gray-700 text-white" : "bg-white border"}`}>
                  <option>Default (Note)</option>
                  <option>Chime</option>
                  <option>Hello</option>
                </select>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={`p-4 rounded-xl ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <h3 className="font-medium text-lg mb-3">Other Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Call notifications</span>
            <Toggle enabled={true} setEnabled={() => {}} />
          </div>
          
          <div className="flex items-center justify-between">
            <span>Status updates</span>
            <Toggle enabled={true} setEnabled={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
};