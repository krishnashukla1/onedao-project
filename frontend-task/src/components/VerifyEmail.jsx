import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Move to the next input if a digit is entered
    if (e.target.value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    // Simulate OTP verification 
    if (enteredOtp.length === 4) {
      navigate('/login');
    } else {
      alert('Please enter a valid OTP');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Verify your email</h2>
      <p className="text-center text-gray-600 mb-4">Enter the OTP from your registered email id</p>
      <form onSubmit={handleSubmit} className="flex justify-center space-x-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </form>
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-200"
      >
        Proceed
      </button>
    </div>
  );
};

export default VerifyEmail;