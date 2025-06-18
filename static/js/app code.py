import streamlit as st
import pandas as pd
from rdkit import Chem
from rdkit.Chem import Descriptors

# App Title
st.title("SMILES String Analyzer")

# Step 1: File Upload
st.header("Upload a SMILES File")
uploaded_file = st.file_uploader("Upload your CSV file containing SMILES strings", type=["csv"])

if uploaded_file:
    try:
        # Step 2: Read the uploaded file
        data = pd.read_csv(uploaded_file)
        
        # Check if SMILES column exists
        if "SMILES" not in data.columns:
            st.error("The uploaded file must contain a 'SMILES' column.")
        else:
            st.success("File uploaded successfully!")
            
            # Display the raw data
            st.subheader("Uploaded Data")
            st.dataframe(data)
            
            # Step 3: Process SMILES Strings
            st.header("SMILES Processing Results")
            results = []
            
            for smiles in data["SMILES"]:
                mol = Chem.MolFromSmiles(smiles)
                if mol:
                    mol_weight = Descriptors.MolWt(mol)  # Calculate molecular weight
                    num_atoms = mol.GetNumAtoms()       # Number of atoms
                    results.append({"SMILES": smiles, "Molecular Weight": mol_weight, "Number of Atoms": num_atoms})
                else:
                    results.append({"SMILES": smiles, "Molecular Weight": "Invalid", "Number of Atoms": "Invalid"})
            
            # Convert results to DataFrame
            results_df = pd.DataFrame(results)
            st.dataframe(results_df)
            
            # Download processed data
            st.download_button(
                label="Download Results as CSV",
                data=results_df.to_csv(index=False),
                file_name="smiles_results.csv",
                mime="text/csv",
            )
    except Exception as e:
        st.error(f"An error occurred: {e}")

