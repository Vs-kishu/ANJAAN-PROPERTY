import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ContactOwner({ propDetail }) {
  const [landlord, setLandlord] = useState(null);
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const onChange = (e) => {
    setMessage(e.target.value);
  };
  const { currentUser } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${propDetail.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (!currentUser) {
      toast.error('UnAuthorized');
      navigate('/signin');
      return;
    }
    fetchLandlord();
  }, [propDetail.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex flex-col gap-2">
          <p>
            Contact <span className="font-semibold">{landlord.userName}</span>{' '}
            for{' '}
            <span className="font-semibold">
              {propDetail.name.toLowerCase()}
            </span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="2"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${propDetail.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}
