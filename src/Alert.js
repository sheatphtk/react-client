// SweetAlertPopup.js
import Swal from 'sweetalert2';

const SweetAlertPopup = () => {
  const showAlert = ({text,type}) => {
    Swal.fire({
      title: '',
      text: text,
      icon: type,
      confirmButtonText: 'OK',
    });
  };

  return (
    <div>
      <button onClick={showAlert}>Show Alert</button>
    </div>
  );
};

export default SweetAlertPopup;