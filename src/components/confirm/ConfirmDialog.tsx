import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { createPortal } from "react-dom";

type props ={
  open ?:boolean;
  title ?:string;
  content ?:string;
  confirmLabel ?:string;
  onConfirm?: ()=>void;
  onCancel: ()=>void;
}



export function  ConfirmDialog (
  {title,content,onConfirm,onCancel,open}: props)
   {
    return createPortal(

    <Dialog 
    open ={open} 
    onCancel={onCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
     <form action="" onSubmit={onConfirm} method="dialog">
     <DialogTitle id="alert-dialog-title">
     {title??"Confirmation"}
      </DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {content??"voulez vous vraiment effectuer cette action?"}
          </DialogContentText>
        </DialogContent>
      
      <DialogActions>
       <button type="submit">Confirmer</button>
       <button type="button" onClick={onCancel}>Cancel</button>
       </DialogActions>
     </form>

    </Dialog>
     , document.body
     ) 

   }
