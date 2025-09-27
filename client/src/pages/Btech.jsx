import React, { useState, useEffect } from 'react';
import { 
  FaBook, FaFolder, FaSearch, FaBell, FaUserCircle, 
  FaStar, FaDownload, FaClock, FaEllipsisV, FaPlus,
  FaChevronDown, FaChevronRight, FaBookOpen, FaGraduationCap,
  FaLaptopCode, FaFlask, FaCalculator, FaHistory, FaGlobe
} from 'react-icons/fa';

const BtechStudyHub = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState({ name: 'Student Name', avatar: null });

  // Mock data for subjects and modules
  useEffect(() => {
    // Simulate API call to fetch data
    const mockData = [
      {
        id: 1,
        name: 'Mathematics',
        icon: <FaCalculator className="text-blue-500" />,
        modules: [
          {
            id: 101,
            name: 'Calculus',
            resources: [
              { id: 1001, name: 'Differentiation Notes', type: 'notes', date: '2023-05-15', rating: 4.5 },
              { id: 1002, name: 'Integration Problems', type: 'assignment', date: '2023-05-18', rating: 4.2 },
              { id: 1003, name: 'Professor Lecture Video', type: 'video', date: '2023-05-10', rating: 4.8 }
            ]
          },
          {
            id: 102,
            name: 'Linear Algebra',
            resources: [
              { id: 1004, name: 'Matrix Operations', type: 'notes', date: '2023-05-20', rating: 4.3 },
              { id: 1005, name: 'Vector Spaces', type: 'notes', date: '2023-05-22', rating: 4.1 }
            ]
          }
        ]
      },
      {
        id: 2,
        name: 'Computer Science',
        icon: <FaLaptopCode className="text-green-500" />,
        modules: [
          {
            id: 201,
            name: 'Data Structures',
            resources: [
              { id: 2001, name: 'Linked Lists Tutorial', type: 'notes', date: '2023-05-12', rating: 4.7 },
              { id: 2002, name: 'Tree Structures', type: 'video', date: '2023-05-14', rating: 4.6 }
            ]
          },
          {
            id: 202,
            name: 'Algorithms',
            resources: [
              { id: 2003, name: 'Sorting Algorithms', type: 'notes', date: '2023-05-16', rating: 4.9 },
              { id: 2004, name: 'Complexity Analysis', type: 'assignment', date: '2023-05-19', rating: 4.4 }
            ]
          }
        ]
      },
      {
        id: 3,
        name: 'Physics',
        icon: <FaFlask className="text-purple-500" />,
        modules: [
          {
            id: 301,
            name: 'Mechanics',
            resources: [
              { id: 3001, name: 'Newton\'s Laws', type: 'notes', date: '2023-05-11', rating: 4.2 },
              { id: 3002, name: 'Projectile Motion', type: 'video', date: '2023-05-13', rating: 4.5 }
            ]
          }
        ]
      },
      {
        id: 4,
        name: 'History',
        icon: <FaHistory className="text-yellow-500" />,
        modules: []
      },
      {
        id: 5,
        name: 'Geography',
        icon: <FaGlobe className="text-red-500" />,
        modules: []
      }
    ];

    setSubjects(mockData);
    setNotifications([
      { id: 1, message: 'New notes uploaded for Calculus', time: '2 hours ago' },
      { id: 2, message: 'Assignment due tomorrow', time: '5 hours ago' },
      { id: 3, message: 'Professor added new video lecture', time: '1 day ago' }
    ]);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedModule(null);
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.modules.some(module => 
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.resources.some(resource => 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  const getIconForType = (type) => {
    switch (type) {
      case 'notes': return <FaBookOpen className="text-blue-500" />;
      case 'video': return <FaGraduationCap className="text-purple-500" />;
      case 'assignment': return <FaBook className="text-green-500" />;
      default: return <FaBook className="text-gray-500" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-md transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between border-b">
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-primary">Btech </h1>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            {sidebarOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
        </div>
        
        <div className="p-4">
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects, modules..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="space-y-2 mt-6">
            {filteredSubjects.map(subject => (
              <div key={subject.id} className="rounded-lg overflow-hidden">
                <div 
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-100 ${selectedSubject?.id === subject.id ? 'bg-blue-50 text-primary' : ''}`}
                  onClick={() => handleSubjectSelect(subject)}
                >
                  <span className="mr-3">{subject.icon}</span>
                  {sidebarOpen && <span className="flex-1">{subject.name}</span>}
                  {sidebarOpen && subject.modules.length > 0 && (
                    <FaChevronDown className="text-gray-400" />
                  )}
                </div>
                
                {sidebarOpen && selectedSubject?.id === subject.id && (
                  <div className="ml-6 mt-1 space-y-1 animate-slide-in">
                    {subject.modules.map(module => (
                      <div 
                        key={module.id}
                        className={`flex items-center p-2 cursor-pointer rounded hover:bg-gray-100 ${selectedModule?.id === module.id ? 'bg-blue-50 text-primary' : ''}`}
                        onClick={() => handleModuleSelect(module)}
                      >
                        <FaFolder className="mr-2 text-yellow-500" />
                        <span>{module.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <div>
              <h2 className="text-xl font-semibold">
                {selectedModule ? selectedModule.name : selectedSubject ? selectedSubject.name : 'Study Hub'}
              </h2>
              <p className="text-sm text-gray-500">
                {selectedSubject ? `${selectedSubject.name} • ${selectedSubject.modules.length} modules` : 'Select a subject to view materials'}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-full hover:bg-gray-200">
                <FaBell />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center">
                {user.avatar ? (
                  <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full" />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-gray-400" />
                )}
                <span className="ml-2">{user.name}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {selectedModule ? (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">{selectedModule.name} Resources</h3>
                <button className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                  <FaPlus className="mr-2" />
                  Add Resource
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedModule.resources.map(resource => (
                  <div key={resource.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{getIconForType(resource.type)}</span>
                        <h4 className="font-medium">{resource.name}</h4>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <FaEllipsisV />
                      </button>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex items-center text-sm text-gray-500">
                        <FaClock className="mr-1" />
                        <span>{resource.date}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                        <FaDownload className="mr-2" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedSubject ? (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-blue-100 rounded-full mb-4">
                <FaFolder className="text-4xl text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Select a module from {selectedSubject.name}</h3>
              <p className="text-gray-600">Choose a module to view and manage study resources</p>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                <FaBook className="text-4xl text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Welcome to Btech  StudyLab</h3>
              <p className="text-gray-600">Select a subject from the sidebar to get started</p>
            </div>
          )}
        </main>
      </div>

      {/* Notifications Panel (can be toggled) */}
      <div className="w-80 bg-white shadow-lg border-l">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map(notification => (
                <div key={notification.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No notifications</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BtechStudyHub;