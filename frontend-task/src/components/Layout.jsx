import backgroundImage from '../assets/background.jpg'; 

const Layout = ({ children }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default Layout;