import React, { useState } from 'react'
import { Box, Grid2, Paper, Typography } from '@mui/material'
import InsertForm from './InsertForm'
import List from './List'
import { MoveToInbox } from '@mui/icons-material';
import cs from './Images.jsx/cs.png'


export default function Home() {
    let initialValue;
    if (localStorage.getItem("notes")==null) {
        initialValue=[]
    } else {
        initialValue=JSON.parse(localStorage.getItem("notes"))
    }
    const[notes,setNotes]=useState(initialValue)
    const deleteNote=(id)=>{
        console.log(id)
        let remainingNotes=notes.filter((item)=>item.id!=id)
        localStorage.setItem("notes",JSON.stringify(remainingNotes))
        setNotes(remainingNotes)
    }
    const updateNote=(note)=>{
        console.log(note)
        let status;
        if (note.completed) {
            status=false;
        } else {
           status=true; 
        }
        let modifiedNote={...note,completed:status}
        console.log(modifiedNote)
        let noteIndex=notes.findIndex((item)=>item.id==note.id)
        console.log(noteIndex)
        let modifiedCompleteNote=[...notes]
        modifiedCompleteNote.splice(noteIndex,1,modifiedNote)
        localStorage.setItem("notes",JSON.stringify(modifiedCompleteNote))
        setNotes(modifiedCompleteNote)
    }
    return (
        <Box
            sx={{
                backgroundColor: "peachpuff",
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage:`url(${cs})`,
                backgroundPosition:"up",
                backgroundSize:"cover",
            }}
        >
            <Paper sx={{p:5,  fontFamily:"cursive",borderRadius:"20px"}}>
                <Box>
                    <Grid2 container spacing={2}></Grid2>
                    <Grid2 size={{xs:12}}>
                        <Typography 
                        sx={{
                            textAlign:"center",
                            fontWeight:"600",
                            color:"purple",
                            textTransform:"uppercase",
                            }}
                            >
                               TO DO LIST
                                </Typography>
                    </Grid2>
                    <Grid2 size={{xs:12}}>
                        <InsertForm notes={notes} setNotes={setNotes}/>
                    </Grid2>
                    <Grid2 size={{xs:12}}>
                        <Box sx={{maxHeight:"40vh",overflow:"auto"}}>
                            {notes.length>0?
                            (notes.map((note,index)=>(
                            <List 
                            updateNote={updateNote}
                            deleteNote={deleteNote}
                            key={index} 
                            note={note}/>   
                            ))):(
                              <Typography color='text.secondary' 
                        sx={{textAlign:'center'}}>
                            NO NOTES FOUND
                        </Typography>  
                            )}
                        </Box>
                        
                    </Grid2>
                </Box>
            </Paper>
        </Box>
    )
}
