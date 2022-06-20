import React, {useState} from 'react';

const UserContext = React.createContext();

const UserProvider = props => {
  const [id, setId] = useState('');
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

  //for rider
  const [laundryId, setLaundryId] = useState('');

  return (
    <UserContext.Provider
      value={{
        id,
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
        laundryId,
        setId,
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
        setLaundryId,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export {UserProvider, UserContext};
