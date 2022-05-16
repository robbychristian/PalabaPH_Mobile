import React, {useState} from 'react';

const RegisterContext = React.createContext();

const RegisterProvider = props => {
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [cnum, setCnum] = useState('');
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [barangay, setBarangay] = useState('');
  const [street, setStreet] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <RegisterContext.Provider
      value={{
        fname,
        mname,
        lname,
        cnum,
        region,
        province,
        city,
        barangay,
        street,
        email,
        pass,
        setFname,
        setMname,
        setLname,
        setCnum,
        setRegion,
        setProvince,
        setCity,
        setBarangay,
        setStreet,
        setEmail,
        setPass,
      }}>
      {props.children}
    </RegisterContext.Provider>
  );
};

export {RegisterProvider, RegisterContext};
