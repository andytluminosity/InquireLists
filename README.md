# InquireLists

A web app that allows users to create and edit lists of items, and receive answers, generated using OpenAI API, to inquiries regarding
their created lists

## Features

- Add new lists
- Add items to specific lists
- Deletion of lists and items
- Ask and receive answers to inquiries about a certain list and its items

## Installation
- [ ] Install npm
      
	Follow the instructions in the following doc to install npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- [ ] Install Python 3.9
	
  On Windows visit `https://www.python.org/downloads/windows/`
	- Click latest Python 3.9 release
	- Scroll down to the bottom to the section titled "Files"
	- Click the Windows Installer (64-bit) link to download the ".exe"
	- In File Explorer right click the file and click "Run as Administrator"
	- Check the boxes "Install launcher for all users (recommended)" and "Install Python 3.9 to path"
	
	On macOS 11+ (Intel) and macOS 11+ (Apple Sillicon) visit "`https://www.python.org/downloads/macos/`"
	- Click latest Python 3.9 release
	- Scroll down to the bottom to the section titled "Files"
	- Click the macOS 64-bit universal2 installer link to download the ".pkg"
	- Run the downloaded ".pkg"
	
    On Debian GNU/Linux 11+ based distros:
    - `sudo apt update`
    - `sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libsqlite3-dev libreadline-dev libffi-dev curl libbz2-dev`
    - `wget https://www.python.org/ftp/python/3.9.12/Python-3.9.12.tgz`
    - `tar -xf Python-3.9.12.tgz`
    - `cd Python-3.9.12`
    - `./configure --enable-optimizations`
    - `make`
    - `sudo make altinstall`

   On Arch Linux based distros run:
	- `sudo pacman -S --needed base-devel git`
 	- `git clone https://aur.archlinux.org/python39.git`
  	- `cd python39`
  	- `makepkg -si`
  	  
On other Linux based distros install python3.9 from your package manager.

- [ ]  Download and extract the `InquireLists` zip folder from the latest release notes
	- [Latest release notes](https://github.com/andytluminosity/InquireLists/releases/tag/v1.0-alpha)
 
- [ ] Install Dependencies
	- `python3.9 -m pip install flask flask_cors` / `python -m pip install flask flask_cors` / `py -m pip install flask flask_cors`
 	- `npm install react-markdown`
   
## Usage

 - [ ] Start the backend server
	- Simple run the file named `backend_server.py` within the python_backend folder
- [ ] Start the frontend and open the webpage
  - Open up your command terminal and change directory to the folder containing the source code `cd PATH_TO_INQUIRELISTS`
    - Eg. `cd C:\Users\YOUR_USERNAME\Downloads\InquireLists`
  - Run `npm install` if you have not already
  - Run `npm run dev`
  - Open [http://localhost:3000](http://localhost:3000) with your browser to see the webpage.

### Note: Ensure that the backend server is running before performing any of these actions
 - [ ] Input your OpenAI API Key
	- Enter your OpenAI API Key into the input box indicated by `OpenAI API Key` and click save
 	- The program will save this API Key so you will only have to input it once
 	- You may change your OpenAI API Key at any time by re-entering it into the input box and clicking save
 - [ ] Create lists
	- Enter the list name into the input box indicated by `Add a new list` and click `Add`
    - You may need to refresh the page to see it
    - The program will save the list and its items so all lists will be intact when the program is restarted
- [ ] Delete lists
  - Simply click the X next to the list you want to delete
- [ ] Add items to lists
	- Select the list you want to add the item to by clicking on it
  - Enter the item you want to add into the input box indicated by `Add a new item` and click `Add`
    - You may need to refresh the list/page to see your changes
    - The program will save the list and its items so all lists will be intact when the program is restarted
- [ ] Delete items 
  - Select the list that the item is in
  - Click the X next to the item you want to delete
- [ ] Make an inquire about a list and its contents
  - ### Note: You must have entered and saved a valid OpenAI API Key with sufficient credits to perform this action
  - Select the list you want to make an inquiry on
  - Enter in your inquiry into the input box indicated by `Prompt to use with selected list items` and click `Generate`
    - It may take a bit to receive an answer depending on the inquiry and size of the selected list
  - Enjoy your AI-generated answer once it's ready!

## Known Issues / Troubleshooting

- [ ] Error upon starting the frontend
	- The first thing the frontend does is load all the user-created lists stored in the backend server
 	- Ensure that the backend server is running and reload the page
- [ ] Error when clicking `Generate`
	- Ensure that the OpenAI API Key you have entered and saved is valid and has sufficient credits for a request
  - Once you have saved a valid OpenAI API Key with sufficient credits, click `Generate` again and the program will generate an answer to your inquiry
 - [ ] My changes to lists are not being made
	- Reloading the page will load the lists with all the changes you have made

## Reporting Other Issues
- When reporting other issues, please describe and provide instructions on recreating the issue. It makes fixing the issue a lot easier!

## Contributors
- [andytluminosity](https://github.com/andytluminosity) - Main Programming
- [Raymo111](https://github.com/Raymo111/kahoot-answer-bot) - Instructions to install Python 3.9
