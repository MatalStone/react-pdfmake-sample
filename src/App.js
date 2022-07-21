import logo from './logo.svg';
import './App.css';
import pdfMake from 'pdfmake';
import axiosBase from 'axios'

const axios = axiosBase.create({
  baseURL: './',
  headers: {
    'Content-Type': 'application/x-font-ttf',
  },
  responseType: 'blob',
})

async function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function() {
      const result = this.result.split('base64,')[1]
      resolve(result)
    };
  
    reader.readAsDataURL(blob)
  })
}

async function onClick() {
  if(pdfMake.vfs == null) {
    const response = await axios.get('ipaexg.ttf')
    if(response.status !== 200) {
      return
    }
    const font = await blobToBase64(response.data)
    pdfMake.vfs = {"ipaexg.ttf": font}
    pdfMake.fonts = {
      IPAEXGothic: {
        normal: 'ipaexg.ttf',
      },
    };
  }
  
  const docDefinition = {
    content: [`テスト出力`],
    defaultStyle: {
      font: 'IPAEXGothic',
    },
  };

  pdfMake.createPdf(docDefinition).download();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          PDFMake sample.
        </p>
        <p
          className="App-link"
          onClick={onClick}
        >
          Export PDF
        </p>
      </header>
    </div>
  );
}

export default App;
