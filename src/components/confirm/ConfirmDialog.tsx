import React from "react";
import { createPortal } from "react-dom";

type props ={
  open?:boolean;
  title?:string;
  content?:string;
  confirmLabel?:string;
  onConfirm?: ()=>void;
  onCancel: ()=>void;
}



export function  ConfirmDialog (
  {title,content,onConfirm,onCancel,open}:props)
   {
    return (
      createPortal(
      <>
     <dialog open={open} onCancel={onCancel}>
      <form action="" onSubmit={onConfirm} method="dialog">
       <h2>{title??"Confirmation"}</h2>
       <p>{content??"voulez vous vraiment effectuer cette action?"}</p>
       <p>
        <button type="submit">Confirmer</button>
        <button type="submit">Cancel</button>
       </p>
      </form>

     </dialog>
      </>
      ,document.body)
    )

   }
