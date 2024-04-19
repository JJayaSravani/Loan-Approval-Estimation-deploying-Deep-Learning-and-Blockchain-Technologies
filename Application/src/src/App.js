
import './App.css';
import React,{ useState,useEffect } from 'react';
import { ethers } from 'ethers';
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  //defining variables
  const [blockCount, setBlockCount] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [data, setData] = useState('');
  const [person_name, setperson_name] = useState('');
  const [person_age, setperson_age] = useState('');
  const [person_income, setperson_income] = useState('');
  const [person_emp_length, setperson_emp_length] = useState('');
  const [loan_grade, setloan_grade] = useState('');
  const [application_no, setapplication_no] = useState('');
  const [loan_amnt, setloan_amnt] = useState('');
  const [loan_int_rate, setloan_int_rate] = useState('');
  const [loan_percent_income, setloan_percent_income] = useState('');
  const [cb_person_cred_hist_length, setcb_person_cred_hist_length] = useState('');
  const SC_address='0xffd985bfc4d2bd31945acc028c229dbbcb8f45ed';//'0x92d2ac5e201de412568f9535d534decc6e5060c4'//'0x29724e4080fe9679dceb28add842de4b5135edbe';
  const SC_ABI = 
    [
      {
        "inputs": [],
        "name": "GetAllInformation",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "person_name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "person_income",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "person_emp_length",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "loan_grade",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "application_no",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "loan_amnt",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "loan_int_rate",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "loan_percent_income",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cb_person_cred_hist_length",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "approval",
                "type": "string"
              }
            ],
            "internalType": "struct data_storage.Block[]",
            "name": "",
            "type": "tuple[]"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_application_no",
            "type": "string"
          }
        ],
        "name": "GetInformationByApplicationNumber",
        "outputs": [
          {
            "components": [
              {
                "internalType": "string",
                "name": "person_name",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "person_income",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "person_emp_length",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "loan_grade",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "application_no",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "loan_amnt",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "loan_int_rate",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "loan_percent_income",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "cb_person_cred_hist_length",
                "type": "string"
              },
              {
                "internalType": "string",
                "name": "approval",
                "type": "string"
              }
            ],
            "internalType": "struct data_storage.Block",
            "name": "",
            "type": "tuple"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "GetNumberOfBlocks",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_person_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_person_income",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_person_emp_length",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_loan_grade",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_application_no",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_loan_amnt",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_loan_int_rate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_loan_percent_income",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_cb_person_cred_hist_length",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "_approval",
            "type": "string"
          }
        ],
        "name": "addInformation",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "applicationNumbers",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "blockCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "name": "blocks",
        "outputs": [
          {
            "internalType": "string",
            "name": "person_name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "person_income",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "person_emp_length",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "loan_grade",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "application_no",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "loan_amnt",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "loan_int_rate",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "loan_percent_income",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "cb_person_cred_hist_length",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "approval",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
  

  // function to execute Deep learning
  const fetchData = async () => {
    if (!person_name || !person_age || !person_income || !person_emp_length || !loan_grade || !application_no || !loan_amnt || !loan_int_rate || !loan_percent_income || !cb_person_cred_hist_length) {
      if (!toast.isActive(toastId.current)) {
        toastId.current = toast.warning("All the feilds must be filled", { autoClose: 3000 });
      }
      else {
      toast.dismiss(toastId.current); // Dismiss the existing warning if age is valid
    }
      return;
  }
  if (55< person_age|| person_age<25|| person_income<1000|| 0> person_emp_length|| person_emp_length>20|| -1> loan_grade|| loan_grade>7|| cb_person_cred_hist_length>15) {
    if (!toast.isActive(toastId.current)) {
      toastId.current = toast.warning("All the feilds must be filled within the values bounded", { autoClose: 3000 });
    }
   else {
    toast.dismiss(toastId.current); // Dismiss the existing warning if age is valid
  }
    return;
}
      //object with input data
      const inputData = {
        person_age: parseFloat(person_age),
        person_income: parseFloat(person_income),
        person_emp_length: parseFloat(person_emp_length),
        loan_grade: parseFloat(loan_grade),
        loan_amnt: parseFloat(loan_amnt),
        loan_int_rate: parseFloat(loan_int_rate),
        loan_percent_income: parseFloat(loan_percent_income),
        cb_person_cred_hist_length: parseFloat(cb_person_cred_hist_length)
      };
    try {
      
      const response = await fetch('http://127.0.0.1:5000/api/dlmodel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputData),
    });

    const result = await response.json();
   
    setData(result.prediction);
  } 
  catch (error) {
      console.error('Error fetching data:', error);
    }
  }




    // function to execute smart contract
    

      useEffect(() => {
        // Load contract instance
        const loadContract = async () => {
          try {
            //await window.ethereum.enable();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(SC_address, SC_ABI, signer);
    
            /* Get the initial number of blocks
            const initialBlockCount = await contract.GetNumberOfBlocks();
            setBlockCount(initialBlockCount.toNumber());*/
    
            // Fetch all blocks
            const allBlocks = await contract.GetAllInformation();
            setBlocks(allBlocks);
          } catch (error) {
            console.error('Error loading contract:', error);
          }
        }
        
        loadContract();
        
      }, []);
    

    
      const addInformation = async () => {
        if (!person_name || !person_age || !person_income || !person_emp_length || !loan_grade || !application_no || !loan_amnt || !loan_int_rate || !loan_percent_income || !cb_person_cred_hist_length) {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.warning("All the feilds must be filled", { autoClose: 3000 });
          }
         else {
          toast.dismiss(toastId.current); // Dismiss the existing warning if age is valid
        }
          return;
      }
      if (55< person_age|| person_age<25|| person_income<1000|| 0> person_emp_length|| person_emp_length>20|| -1> loan_grade|| loan_grade>7|| cb_person_cred_hist_length>15)  {
        if (!toast.isActive(toastId.current)) {
          toastId.current = toast.warning("All the feilds must be filled within the values bounded", { autoClose: 3000 });
        }
       else {
        toast.dismiss(toastId.current); // Dismiss the existing warning if age is valid
      }
        return;
    }
      //loan_int_rate=loan_int_rate+ "("+loan_percent_income+" )"
        try {
          
          // Ensure MetaMask is installed and enabled
          if (!window.ethereum || !window.ethereum.isMetaMask) {
            throw new Error('MetaMask not found');
          }
    
          // Connect to MetaMask
          await window.ethereum.enable();
          // window.ethereum.request({ method: 'eth_requestAccounts' }); eth_requestAccounts->array

    
          // Create a new ethers.js provider and signer
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
    
          // Create a contract instance
          const contract = new ethers.Contract(SC_address, SC_ABI, signer);
          const formattedTimestamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
          
          
          await contract.addInformation(
            person_name, 
            person_income,
            person_emp_length, 
            loan_grade,
            application_no+" ["+formattedTimestamp.toString()+" ]",
            loan_amnt,
            loan_int_rate,
            loan_percent_income,   
            cb_person_cred_hist_length, 
            data
            
          );
    
          // Update the block count
          const newBlockCount = await contract.GetNumberOfBlocks();
          setBlockCount(newBlockCount.toNumber());
    
          // Fetch updated blocks
          const updatedBlocks = await contract.GetAllInformation();
          setBlocks(updatedBlocks);
        } catch (error) {
          console.error('Error adding information:', error);
        }
        //window.location.reload();// after 10 sec }, 10000);
      };

    //search bar
      const [searchQuery, setSearchQuery] = useState('');

      const filteredBlocks = blocks.filter((block) =>
        block.application_no.includes(searchQuery)|| block.person_name.includes(searchQuery)
      );

      // handling conditions
      
      const toastId = React.useRef(null);
      const handleAgeChange = (e) => {
        const value = e.target.value;
        setperson_age(value);
    
        if (value < 25 || value > 55) {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.warning(" Age must be between 25 to 55", { autoClose: 3000 });
          }
        } else {
          toast.dismiss(toastId.current); // Dismiss the existing warning if age is valid
        }
      };
      const handlePersonIncome=(e)=>{
        const value = e.target.value;
        setperson_income(value);
        if(value<1000)
        {
          if(!toast.isActive(toastId.current))
          {
            toastId.current=toast.warning(" Minimum Income of person must be 1000", { autoClose: 3000 });
          }
        }else{
          
          toast.dismiss(toastId.current);
        }
      };

      const handleperson_emp_length = (e) => {
        const value = e.target.value;
        setperson_emp_length(value);
    
        if (value < 1 || value > 20) {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.warning(" Employee lenght must be 1 to 20", { autoClose: 3000 });
          }
        } else {
          toast.dismiss(toastId.current); // Dismiss the existing warning if age is valid
        }
      };

      const handleloan_grade = (e) => {
        const value = e.target.value;
        setloan_grade(value);
    
        if (value <  -1 || value > 7) {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.warning(" grade value is 0 to 6 \n 0 -> minimum risk \n 6 -> maximum risk", { autoClose: 3000 });
          }
        } else {
          toast.dismiss(toastId.current); // Dismiss the existing warning if age is valid
        }
      };

      const handlecb_person_cred_hist_length = (e) => {
        const value = e.target.value;
        setcb_person_cred_hist_length(value);
    
        if (value > 15) {
          if (!toast.isActive(toastId.current)) {
            toastId.current = toast.warning(" max value is 15", { autoClose: 3000 });
          }
        } else {
          toast.dismiss(toastId.current); // Dismiss the existing warning if age is valid
        }
      };




  //front end
  return (
    <div className="App">
      <header className="App-header">
        <h1>Loan Approval Prediction using Deep Learning</h1>
        <ToastContainer />
      <div className="input-container">
      <div className="input-group">
            <label htmlFor="person_name">Person Name:</label>
            <input type="text" id="person_name" value={person_name} onChange={(e) => setperson_name(e.target.value)}  />
            <br />
            <label htmlFor="person_age">Person Age:</label>
            <input type="number" id="person_age" value={person_age} onChange={handleAgeChange}  />
            <br/>
            <label htmlFor="person_income">Person Income:</label>
            <input type="number" id="person_income" value={person_income} onChange={handlePersonIncome} min ="1000" />
            <br />
            <label htmlFor="person_emp_length">Person Employment Length:</label>
            <input type="number" id="person_emp_length" value={person_emp_length} onChange={handleperson_emp_length}  />
            <br />
            <label htmlFor="loan_grade">Loan Grade:</label>
            <input type="number" id="loan_grade" value={loan_grade} onChange={handleloan_grade}  />
          </div>
         
          <div className="input-group">
            <label htmlFor="application_no">Application Number:</label>
            <input type="text" id="application_no" value={application_no} onChange={(e) => setapplication_no(e.target.value)} />
            <br />
            <label htmlFor="loan_amnt">Loan Amount:</label>
            <input type="number" id="loan_amnt" value={loan_amnt} onChange={(e) => setloan_amnt(e.target.value)} />
            <br />
            <label htmlFor="loan_int_rate">Loan Interest Rate:</label>
            <input type="number" id="loan_int_rate" value={loan_int_rate} onChange={(e) => setloan_int_rate(e.target.value)} />
            <br />
            <label htmlFor="loan_percent_income">Loan Percent Income:</label>
            <input type="number" id="loan_percent_income" value={loan_percent_income} onChange={(e) => setloan_percent_income(e.target.value)} />
            <br />
            <label htmlFor="cb_person_cred_hist_length">Credit History Length:</label>
            <input type="number" id="cb_person_cred_hist_length" value={cb_person_cred_hist_length} onChange={handlecb_person_cred_hist_length} max="15" />
          </div>
          </div>
          <div className='button-container'>
          <div className="center-container">
          <button onClick={fetchData}>Predict</button>
        </div>
        <div className="center-container">
        <button onClick={addInformation}>Save Data</button>
        </div>
        </div>
        
        
        {data && (
          <div>
            <p>Loan Approval:</p>
            <pre>{data}</pre>
          </div>
        )}
      </header>
      <h2>Stored Information</h2>
      <div className="search-bar">
          <label htmlFor="search">Search by Application Number or Name:</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          /></div>

      
      <div className="input-group">
      <table>
        <thead>
          <tr>
            <th>Person Name</th>
            <th>Application Number </th>
            
            <th>Person Income</th>
            <th>Person Employment Length</th>
            <th>Credit History Length</th>
            <th>Loan Amount</th>
            <th>Loan Interest Rate</th>
            <th>Loan Grade</th>
            <th>Loan Percent Income</th>
            <th>Approval</th>
            
            
            {/* Add other table headers */}
          </tr>
        </thead>
        
        <tbody>
    {filteredBlocks.length > 0 ? (
      filteredBlocks.map((block, index) => (
        <tr key={index}>
          <td>{block.person_name}</td>
          <td>{block.application_no}</td>
          <td>{block.person_income}</td>
          <td>{block.person_emp_length}</td>
          <td>{block.cb_person_cred_hist_length}</td>
          <td>{block.loan_amnt}</td>
          <td>{block.loan_int_rate}</td>
          <td>{block.loan_grade}</td>
          <td>{block.loan_percent_income}</td>
          <td>{block.approval}</td>
          
          {/* Add other table data */}
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="11">No matching results</td>
      </tr>
    )}
  </tbody>
    </table>
    </div>

    </div>
  );
}

export default App;
