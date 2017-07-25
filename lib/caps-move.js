'use babel';

import CapsMoveView from './caps-move-view';
import { CompositeDisposable } from 'atom';

function move(e){
  console.log(move.moveMode);
  if(!move.moveMode) move.moveMode = false;
  if(e.key === 'CapsLock') move.moveMode = true;
  if(move.moveMode === true){
    switch(e.key){
      case 'J':
      console.log('move right');
      //move right
      break;
      case 'I':
      console.log('move down');
      //move down
      break;
      case 'F':
      console.log('move left');
      //move left
      break;
      case 'E':
      console.log('move up');
      //move up
      break;
    }
  }
}

export default {

  capsMoveView: null,
  modalPanel: null,
  subscriptions: null,


  activate(state) {
    atom.views.getView(atom.workspace).addEventListener("keydown", move);

    atom.views.getView(atom.workspace).addEventListener("keyup",function(e){
      if(e.key === "CapsLock"){
        move.moveMode = false;
        console.log(move);
      }
    });

    this.capsMoveView = new CapsMoveView(state.capsMoveViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.capsMoveView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'caps-move:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.capsMoveView.destroy();
  },

  serialize() {
    return {
      capsMoveViewState: this.capsMoveView.serialize()
    };
  },


  toggle() {
    // console.log('CapsMove was toggled!');
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
  },

  capped() {
    console.log('capped');
  }

};
