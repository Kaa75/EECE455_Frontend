import { Button } from "@mui/material";

interface FuncProps {
    inputText: string;
    SetOutput: (value: string) => void;
    keyString: string; 
    encryptionmethod: string;
}

const GetOutputAffine = (inputText: string, keyString: string) => {
    const [aValue, bValue] = keyString.split(",");  // Split to get aValue and bValue
    return `Decrypted the ciphertext ${inputText} with A=${aValue}, B=${bValue}`;
};

const GetOutputMonoAlphabetic = (inputText: string, keyString: string) => {
    return `Decrypted the ciphertext ${inputText} with new alphabet = [${keyString}]`;
};

const DecryptButton = ({ inputText, SetOutput, keyString, encryptionmethod }: FuncProps) => {
    const handleClick = () => {
        let output = "";
        switch (encryptionmethod) {
            case "Affine":
                output = GetOutputAffine(inputText, keyString);
                break;
            case "Mono-Alphabetic":
                output = GetOutputMonoAlphabetic(inputText, keyString) 
                break;
            case "Vigenere":
                // Implement the decryption logic here
                break;
            case "Hill":
                // Implement the decryption logic here
                break;
            case "Playfair":
                // Implement the decryption logic here
                break;
            case "Extended GCD":
                // Implement the decryption logic here
                break;
            default:
                break;
        }
        SetOutput(output);
    };

    return (
        <Button 
            variant="contained" 
            size="large" 
            onClick={handleClick}
            sx={{
                backgroundColor: '#111B20',   
                color: 'white',       
                '&:hover': {
                    backgroundColor: 'black',  
                },
            }}
        >
            Decrypt
        </Button>
    );
};

export default DecryptButton;