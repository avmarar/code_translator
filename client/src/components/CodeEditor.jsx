import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { CircularProgress, Button, Snackbar, Alert } from '@mui/material'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Copy from '../icons/Copy'
import Delete from '../icons/Delete'
import Home from '../icons/Home'

const CodeEditor = ({ sourceLang, targetLang, setLoadEditor }) => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [anchor] = useState({
    vertical: 'top',
    horizontal: 'right',
  })

  const { vertical, horizontal } = anchor

  const handleSubmit = () => {
    setLoading(true)
    fetch('http://localhost:4000/convert', {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache',
      body: JSON.stringify({
        sourceCode: input,
        sourceLang,
        targetLang,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data?.response)
        let response = data?.response?.choices[0]?.message?.content
        setLoading(false)
        setOutput(response)
      })
      .catch((err) => console.error(err))
  }

  const handleCopy = () => setOpen(true)
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <>
      <header className="header__container">
        <div className="header">
          <Home setLoadEditor={setLoadEditor} />
          <h3
            style={{ display: 'flex', width: '70%', justifyContent: 'center' }}
          >
            Source
          </h3>
          <div className="header__right__source">
            <Button
              variant="contained"
              onClick={handleSubmit}
              color="success"
              size="medium"
            >
              Convert
            </Button>
            <Delete setInput={setInput} />
          </div>
        </div>
        <div className="header">
          <h3
            style={{ display: 'flex', width: '95%', justifyContent: 'center' }}
          >
            Target
          </h3>
          <div className="header__right__target">
            <CopyToClipboard text={output} onCopy={handleCopy}>
              <span>
                <Copy />
              </span>
            </CopyToClipboard>
          </div>
        </div>
      </header>
      <div className="code__container">
        <div className="code">
          <Editor
            height="90vh"
            className="editor"
            defaultValue=""
            value={input}
            onChange={(value) => {
              setInput(value)
            }}
            defaultLanguage={sourceLang.toLowerCase()}
            theme="vs-dark"
          />
        </div>
        <div className="output">
          {loading ? (
            <div className="loader">
              <CircularProgress color="success" />
            </div>
          ) : (
            <Editor
              height="90vh"
              className="editor"
              defaultLanguage={targetLang.toLowerCase()}
              options={{
                domReadOnly: true,
                readOnly: true,
              }}
              defaultValue=""
              value={output}
              onChange={(value) => setOutput(value)}
              theme="vs-dark"
            />
          )}
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          Copied Successfully!
        </Alert>
      </Snackbar>
    </>
  )
}

export default CodeEditor
