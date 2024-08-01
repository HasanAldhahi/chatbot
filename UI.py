import requests
import uuid
import streamlit as st
import subprocess
import psutil
import threading

# Replace with your Etherpad Lite API key
with open('/home/cloud/pad/etherpad-lite/apikey', 'r') as file:
    api_key = file.read().strip()

# Replace with the base URL of your Etherpad Lite instance
base_url = 'http://localhost:9001'

def create_pad():
    # The ID of the new pad
    pad_id = str(uuid.uuid4())

    # The API endpoint for creating a new pad
    api_url = f'{base_url}/api/1.2.15/createPad?apikey={api_key}&padID={pad_id}'

    # Send a POST request to the API endpoint
    response = requests.post(api_url)

    # Check if the request was successful
    if response.status_code == 200:
        st.write(f'Pad created successfully. URL: http://141.5.101.91:9001/p/{pad_id}')
        return pad_id
    else:
        st.error(f'Failed to create pad. Status code: {response.status_code}')
        return None

def run_narges_test(room_address, pad_id, accesskey=None):
    command = ['./fastwhisperr.py', room_address, '--verbose', '--pad_id', str(pad_id)]
    if accesskey:
        command.extend(['--accesskey', accesskey])

    #st.write(f"Running command: {' '.join(command)}")  # Debugging line

    try:
        # Start the subprocess and return the process handle
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

        # Start a timer to stop the process after a certain amount of time
        timeout_seconds = 3600 # 1 hour, adjust as needed
        timer = threading.Timer(timeout_seconds, stop_process, args=[process])
        timer.start()

        return process
    except Exception as e:
        st.error(f"Failed to start the transcription process: {e}")
        return None

def run_llm(pad_id):
    command = ['./llm2.py', '--pad_id', str(pad_id)]
    try:
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        if corrections:
            command.extend(['--corrections', corrections])
        stdout, stderr = process.communicate()
        #st.write("### LLM Output:")
        st.code(stdout)
        if stderr:
            st.error(stderr)
    except Exception as e:
        st.error(f"Failed to start the LLM process: {e}")

# Function to stop the running process
def stop_process(process):
    try:
        parent = psutil.Process(process.pid)
        for child in parent.children(recursive=True):
            child.terminate()
        parent.terminate()
        parent.wait() # Ensure the process has terminated
        st.write("Process stopped successfully.")
    except psutil.NoSuchProcess:
        st.write("No process found to stop.")
    except Exception as e:
        st.error(f"Failed to stop the transcription process: {e}")

# Streamlit UI components
st.set_page_config(page_title='BBB Room Voice-Transcriptor', page_icon='🎤')

st.title('BBB Room Voice-Transcriptor')
st.markdown('''Fill in the details below and click **Run Transcriptor**. Max limit time is set to 30 minues. 
\n By stopping the trancriptor properly, you will also see the summary of the transcription at the bottom of your pad.''')

room_address = st.text_input('Room Address (URL)')
accesskey = st.text_input('Access Key (leave it empty if there is none)')
corrections = st.text_input('Words/terms that should be written correctly (optional)')

# Define a placeholder for storing the process handle and pad_id
if 'process' not in st.session_state:
    st.session_state.process = None
if 'pad_id' not in st.session_state:
    st.session_state.pad_id = None

col1, col2 = st.columns(2)

with col1:
    if st.button('Run Transcriptor'):
        if st.session_state.pad_id is None:
            st.session_state.pad_id = create_pad()

        if not room_address:
            st.error('Room Address is required!')
        else:
            st.write('Running the transcriptor...')
            st.write('You can stop transcription by clicking the stop button, otherwise it will stop automatically in 30 minutes.')

            # Run the script with provided inputs
            process = run_narges_test(room_address, st.session_state.pad_id, accesskey)
            if process:
                st.session_state.process = process

                # Display the output
                stdout, stderr = process.communicate()
                st.write("### Transcription Output:")
                st.code(stdout)
                if stderr:
                    st.error(stderr)

with col2:
    if st.button('Stop Transcriptor'):
        if st.session_state.process:
            stop_process(st.session_state.process)
            st.session_state.process = None
            run_llm(st.session_state.pad_id)
        else:
            st.write("No running process found.")
