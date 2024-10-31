// src/styles/GlobalStyles.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
body {
  height: 100vh;
  background-color: #f5f5f7;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: #333;
  padding: 0;
  max-width: 768px;
  margin: 0 auto;
  position: relative;
}

/* splash screen */
.splash {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #0071e3;
  z-index: 200;
  color: white;
  text-align: center;
}

.splash.display-none {
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #0071e3;
  z-index: -10;
  color: white;
  text-align: center;
  line-height: 90vh;
  transition: 1s;
}

.splash h1 {
  margin-bottom: 10vh;
}

.fade-in {
  opacity: 0;
  animation: fadeIn 1s ease-in forwards;
}

#game {
  position: relative;
  text-align: center;
  padding: 20px;
}

#cats {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.cat-container {
  height: 120px;
  display: flex;
  align-items: end;
}

#cats>div>div {
  margin: 0 10px;
}

.cat-container>div {
  cursor: pointer;
  margin: auto 10px;
}

#cats img {
  vertical-align: bottom;
}

#bucket {
  position: relative;
  min-height: 200px;
  width: 80%;
  border: 3px solid black;
  border-top: 1px dashed black;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  box-shadow: 1px 10px 20px rgba(0, 0, 0, 0.2);
}

#bucket #bucket-instructions {
  width: 100%;
  margin: 20px auto;
  font-size: 1.5em;
  font-family: Fredoka, cursive;
  color: #949494;
}

#bucket #bucket-instructions-arrow {
  position: absolute;
  top: -10px;
  left: calc(50% - 25px);
}

#bucket #bucket-instructions-arrow img {
  height: 50px;
  opacity: 0.5;
  animation: animateUpDown 2s ease-in-out infinite;
}

.button {
  background-image: linear-gradient(to bottom, #0071e3, #005cb9);
  color: #fff;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  margin: 20px 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100px;
}

#submit:hover,
#reset:hover {
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
}

#question,
#total {
  font-size: 2em;
  margin: 0 auto;
  padding: 10px 0;
  color: #0071e3;
}

#question {
  font-family: Fredoka, cursive;
  font-size: 3em;
  color: #0071e3;
  margin: 40px 0 20px;
}

#question small {
  vertical-align: top;
}

#score,
#config {
  position: absolute;
  top: 10px;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  margin: 20px;
}

#score {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  right: 10px;
  background-image: linear-gradient(to bottom, #ff9259, #17bdec);
  padding: 10px 20px;
}

#config {
  left: 10px;
}

#config img {
  height: 40px;
}

#yes {
  position: absolute;
  display: none;
  top: calc(50% - 120px);
  left: 25%;
  width: 50%;
  z-index: 999;
  animation: appearFromCenter 0.5s;
}

#yes img {
  width: 100%;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto;
  border: 1px solid #888;
  border-radius: 10px;
  max-width: 550px;
  padding: 20px;
  font-size: 1.3em;
  color: #000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

#config-modal {
  font-size: 16px;
}

#config-modal .modal-content {
  width: calc(100% - 40px);
  max-width: 600px;
  border: 10px solid #f3f6d5;
  padding: 0;
  background-color: #f3f5d7;
}

#config-modal .modal-header {
  width: 100%;
  overflow: hidden;
}

#config-modal .modal-header img {
  width: 100%;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
}

#config-modal #config-modal-body {
  margin: 10px 0;
  background-color: #01b5a6;
  padding: 10px;
  border-radius: 20px;
  border: 10px solid #1fe6c9;
}

.config-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
}

.config-row input {
  width: 7em;
  background-color: #f8f8f8;
}

.config-row input[type="number"] {
  padding: 8px 12px;
  box-sizing: border-box;
  border: 2px solid #d0d0d0;
  border-radius: 15px;
}

.config-row input[type="checkbox"] {
  margin: 0;
}

.config-row .config-name {
  display: flex;
  align-items: center;
  width: calc(100% - 7em);
  padding: 8px 12px;
  border: 2px solid #d0d0d0;
  border-radius: 15px;
  background-color: #f8f8f8;
}

#close-config {
  margin-left: 0;
  background-image: linear-gradient(to bottom, #ffaf2e, #fe982a);
  border-radius: 14px;
  font-size: 16px;
}

#close-config:hover {
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  font-size: 18px;
}

#logContainer {

  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  border: 2px solid white;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(5, minmax(250px, 0.5fr));
  gap: 1em;
  margin: 35px;
  margin-left: 90px;
  flex-direction: column;
  justify-content: flex-start;
}



.active {
  width: 100%;
  max-width: 250px;
  margin-right: 0px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}

#closeButton {
  display: none;
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 20px;
}

ul {
  list-style: none;
}

#clearLogButton {
  display: none;
}

@keyframes animateUpDown {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0);
  }
}

@keyframes appearFromCenter {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}
`;

export default GlobalStyles;
