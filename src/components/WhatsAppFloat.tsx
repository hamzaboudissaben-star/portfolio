import { FaWhatsapp } from 'react-icons/fa';
import Magnetic from './Magnetic';
import { profile } from '../data/portfolio';

export default function WhatsAppFloat() {
  return (
    <div className="fixed bottom-6 left-6 z-40">
      <Magnetic>
        <a
          href={profile.whatsapp}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
          className="glow-icon flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-xl shadow-green-500/30 hover:!border-green-300 hover:!shadow-[0_0_26px_rgba(37,211,102,.65)]"
        >
          <FaWhatsapp />
        </a>
      </Magnetic>
    </div>
  );
}
