// HillCipherPage.tsx
import React, { useState, useEffect } from 'react';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Grid, TextField, Tooltip, Button } from '@mui/material';
import EncryptButton from '../components/EncryptButton';
import DecryptButton from '../components/DecryptButton';

interface MatrixProps {
  size: number;
  onMatrixChange: (matrix: string[][]) => void;
}

const Matrix: React.FC<MatrixProps> = ({ size, onMatrixChange }) => {
    const [values, setValues] = useState<string[][]>(
        Array.from({ length: size }, () => Array(size).fill("0"))
    );

    useEffect(() => {
        const initialValues = Array.from({ length: size }, () => Array(size).fill("0"));
        setValues(initialValues);
        onMatrixChange(initialValues);
    }, [size]);

    const handleChange = (row: number, col: number, value: string) => {
        const regex = /^-?\d*$/; // Regex for optional negative sign followed by digits

        if (regex.test(value) || value === "") {
            const updatedValues = values.map((r, rIdx) =>
                r.map((c, cIdx) => (rIdx === row && cIdx === col ? value : c))
            );
            setValues(updatedValues);
            onMatrixChange(updatedValues);
        }
    };

    return (
        <Grid container direction="column" spacing={2}>
            {values.map((row, rowIndex) => (
                <Grid
                    container
                    item
                    key={rowIndex}
                    spacing={2}
                    justifyContent="center"
                >
                    {row.map((value, colIndex) => (
                        <Grid item key={colIndex}>
                            <TextField
                                variant="outlined"
                                size="small"
                                style={{ width: '90px', backgroundColor: 'white' }}
                                value={value}
                                onChange={(e) =>
                                    handleChange(rowIndex, colIndex, e.target.value)
                                }
                                inputProps={{
                                    type: "text",
                                }}
                                InputProps={{
                                    style: { backgroundColor: 'white' },
                                }}
                            />
                        </Grid>
                    ))}
                </Grid>
            ))}
        </Grid>
    );
};




function HillCipherPage() {
	const [matrixSize, setMatrixSize] = useState<number>(2);
	const [textValue, setTextValue] = useState("");
	const [outputValue, setOutputValue] = useState("");
	const [combinedKey, setCombinedKey] = useState<string>("");
	const [alphabet, setAlphabetValue] = useState<string>("abcdefghijklmnopqrstuvwxyz".toUpperCase());
	const method = "Hill";
	const [inverseMatrix, setInverseMatrix] = useState<string[][]>(
		Array.from({ length: matrixSize }, () => Array(matrixSize).fill(""))
	  );

	const handleAlphabetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^[a-zA-Z]*$/.test(value)) { // Allow only alphabet letters
            const uniqueLetters = Array.from(new Set(value.split(''))).join('');
            setAlphabetValue(uniqueLetters.toUpperCase());
        }
    };

	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value;
		value = value.replace(/[A-Z]/g, (char) => char.toLowerCase()); // Convert uppercase to lowercase
		setTextValue(value);
	}
	const handleMatrixChange = (matrix: string[][]) => {
		console.log('Updated Matrix:', matrix);
		const newKey = matrix.flat().join(",");
		setCombinedKey(() => newKey);

		// Compute the inverse matrix
		const modulus = alphabet.length;
		const numericMatrix = matrix.map(row => row.map(value => parseInt(value) % modulus));
		const invMatrix = computeInverseMatrix(numericMatrix, modulus);
	
		if (invMatrix) {
		  const invMatrixStrings = invMatrix.map(row => row.map(value => value.toString()));
		  setInverseMatrix(invMatrixStrings);
		} else {
		  const emptyMatrix = Array.from({ length: matrixSize }, () => Array(matrixSize).fill(""));
		  setInverseMatrix(emptyMatrix);
		}
	};

	const toggleMatrixSize = () => {
		setMatrixSize((prevSize) => (prevSize === 2 ? 3 : 2));
	};


	return (
		<div
		style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column',
			boxSizing: 'border-box',
		}}
		>
		<div style={{ gap: '1rem', display: 'flex', alignItems: 'center' }}>
			<h1>Hill Cipher</h1>
			<Tooltip
			title="Instructions: Enter the key matrix for the Hill Cipher. The matrix should be invertible and its size should match the block size of the plaintext."
			componentsProps={{
				tooltip: {
				sx: {
					fontSize: '1rem',
				},
				},
			}}
			>
			<HelpOutlineOutlinedIcon fontSize="large" />
			</Tooltip>
		</div>

		<div style={{ display: 'flex', alignItems: 'center', marginLeft: '-8rem'}}>
			<Matrix size={matrixSize} onMatrixChange={handleMatrixChange}/>
			<Button
			variant="contained"
			onClick={toggleMatrixSize}
			style={{ 
				marginRight: '5rem',
				// justifyContent: 'left',
				
			}}
			>
			Switch to {matrixSize === 2 ? '3x3' : '2x2'}
			</Button>

			<div style={{ marginLeft: '4rem' }}>
				<InverseMatrix values={inverseMatrix} />
			</div>
			
		</div>
		

		<div style={{ marginTop: '20px', fontSize: 26, width: '75%' }}>
		<TextField 
                  id="outlined-basic-a" 
                  label="Enter Shuffled Alphabet" 
                  variant="filled"
                  value={alphabet}
                  onChange={handleAlphabetChange}
                  sx={{ 
                    	backgroundColor: 'white', 
                    	borderRadius: '8px',
                    	width: '20rem',
						marginBottom: '1rem'
                  }}
              />
				<label htmlFor="plaintext-input" style={{ marginBottom: '5px', display: 'block', color: 'white' }}>Enter Text</label>
				<TextField  
					id="plaintext-input" 
					variant="filled"
					multiline
					rows={6}
					sx={{
						backgroundColor: 'white', 
						borderRadius: '8px', 
						width: '100%'
					}}
					onChange={handleTextChange}
					value={textValue}
				/>
			</div>

			{/* Button Section */}
			<div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10rem' }}>
				<EncryptButton SetOutput={setOutputValue} inputText={textValue} keyString={combinedKey} encryptionmethod={method} alphabet={alphabet}/>
				<DecryptButton SetOutput={setOutputValue} inputText={textValue} keyString={combinedKey} encryptionmethod={method} alphabet={alphabet}/>          
			</div>
			
			{/* Output Section */}
			<div style={{ marginTop: '60px', fontSize: 26, width: '75%' }}>
				<label htmlFor="output-input" style={{ marginBottom: '5px', display: 'block', color: 'white' }}>Output</label>
				<TextField  
					id="output-input" 
					variant="filled"
					multiline
					rows={6}
					disabled
					sx={{
						backgroundColor: 'white', 
						borderRadius: '8px', 
						width: '100%'
					}}
					value={outputValue}
				/>
			</div>  
			<div>
				<h3>backgroudn info</h3>
				<p> Hill cipher is a polygraphic substitution cipher based on linear algebra. Each letter is represented by a number modulo 26. Often the simple scheme A=0, B=1, ..., Z=25 is used, but this is not an essential feature of the cipher. To encrypt a message, each block of n letters (considered as an n-component vector) is multiplied by an invertible n × n matrix, then reduced modulo 26. The matrix used for encryption is the cipher key, and it should be chosen randomly from the set of invertible n × n matrices (modulo 26).</p>
			</div>
		</div>
	);
}

// Function to compute the inverse of the matrix modulo N
function computeInverseMatrix(matrix: number[][], modulus: number): number[][] | null {
	const size = matrix.length;
	if (size === 2) {
	  // Compute inverse for 2x2 matrix
	  const det = (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % modulus;
	  const detInv = modInverse(det, modulus);
	  if (detInv === null) return null;
  
	  const invMatrix = [
		[(matrix[1][1] * detInv) % modulus, (-matrix[0][1] * detInv) % modulus],
		[(-matrix[1][0] * detInv) % modulus, (matrix[0][0] * detInv) % modulus]
	  ];
  
	  // Adjust values to be positive modulo modulus
	  const adjustedInvMatrix = invMatrix.map(row =>
		row.map(value => ((value % modulus) + modulus) % modulus)
	  );
  
	  return adjustedInvMatrix;
	} else if (size === 3) {
	  // Compute inverse for 3x3 matrix
	  const invMatrix = compute3x3Inverse(matrix, modulus);
	  if (invMatrix) {
		return invMatrix;
	  } else {
		return null;
	  }
	}
	return null;
  }
  
  function modInverse(a: number, modulus: number): number | null {
	// Extended Euclidean Algorithm to find the modular inverse
	let m0 = modulus;
	let x0 = 0;
	let x1 = 1;
  
	if (modulus === 1) return null;
  
	while (a > 1) {
	  const q = Math.floor(a / modulus);
	  let t = modulus;
  
	  modulus = a % modulus;
	  a = t;
	  t = x0;
  
	  x0 = x1 - q * x0;
	  x1 = t;
	}
  
	if (x1 < 0) x1 += m0;
  
	return x1;
  }
  
  function compute3x3Inverse(matrix: number[][], modulus: number): number[][] | null {
	// Calculate the determinant
	const det = (
	  matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
	  matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
	  matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
	) % modulus;
  
	const detInv = modInverse(det, modulus);
	if (detInv === null) return null;
  
	// Compute the adjugate matrix
	const adjugate = [
	  [
		((matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) % modulus + modulus) % modulus,
		((-(matrix[0][1] * matrix[2][2] - matrix[0][2] * matrix[2][1])) % modulus + modulus) % modulus,
		((matrix[0][1] * matrix[1][2] - matrix[0][2] * matrix[1][1]) % modulus + modulus) % modulus,
	  ],
	  [
		((-(matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0])) % modulus + modulus) % modulus,
		((matrix[0][0] * matrix[2][2] - matrix[0][2] * matrix[2][0]) % modulus + modulus) % modulus,
		((-(matrix[0][0] * matrix[1][2] - matrix[0][2] * matrix[1][0])) % modulus + modulus) % modulus,
	  ],
	  [
		((matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0]) % modulus + modulus) % modulus,
		((-(matrix[0][0] * matrix[2][1] - matrix[0][1] * matrix[2][0])) % modulus + modulus) % modulus,
		((matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]) % modulus + modulus) % modulus,
	  ],
	];
  
	// Multiply adjugate matrix by determinant inverse modulo modulus
	const invMatrix = adjugate.map(row =>
	  row.map(value => (detInv * value) % modulus)
	);
  
	// Adjust values to be positive modulo modulus
	const adjustedInvMatrix = invMatrix.map(row =>
	  row.map(value => ((value % modulus) + modulus) % modulus)
	);
  
	return adjustedInvMatrix;
  }
  
  const InverseMatrix: React.FC<{ values: string[][] }> = ({ values }) => {
	return (
	  <Grid container direction="column" spacing={2}>
		{values.map((row, rowIndex) => (
		  <Grid item key={`row-${rowIndex}`}>
			<Grid container spacing={2} justifyContent="center">
			  {row.map((value, colIndex) => (
				<Grid item xs={4} key={`cell-${rowIndex}-${colIndex}`}>
				  <TextField
					variant="outlined"
					size="small"
					fullWidth
					style={{ backgroundColor: 'white' }}
					value={value}
					InputProps={{
					  readOnly: true,
					  style: { backgroundColor: 'white' },
					}}
				  />
				</Grid>
			  ))}
			</Grid>
		  </Grid>
		))}
	  </Grid>
	);
  };

export default HillCipherPage;
