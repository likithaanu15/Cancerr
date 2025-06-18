from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

# Load the Excel file
excel_file_path = "D:\\Likitha\\EXCEL DATA BRAIN CANCER.xlsx"  # Double backslashes
 # Replace with your Excel file path
df = pd.read_excel(excel_file_path)

@app.route('/', methods=['GET', 'POST'])
def index():
    gene_name = ''  # Default empty gene name
    tables = []  # Default empty table list
    if request.method == 'POST':
        gene_name = request.form['gene_name'].strip()  # Strip spaces to prevent search issues

        if gene_name:  # Only search if the input is not empty
            # Filter the DataFrame to find matching gene names (case-insensitive search)
            filtered_df = df[df['Gene Names'].str.contains(gene_name, case=False, na=False)]
            
            if not filtered_df.empty:
                # Convert "Sequence" column to clickable links
                if 'Sequence' in filtered_df.columns:
                    filtered_df['Sequence'] = filtered_df['Sequence'].apply(
                        lambda x: f'<a href="{x}" target="_blank">{x}</a>' if pd.notna(x) else x
                    )
                tables = [filtered_df.to_html(classes='data', header=True, escape=False)]  # escape=False allows HTML

    return render_template('index.html', tables=tables, gene_name=gene_name)

if __name__ == '__main__':
    app.run(debug=True)
