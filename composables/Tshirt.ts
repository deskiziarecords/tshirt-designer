import {Canvas, loadSVGFromURL, Textbox, Image, util} from 'fabric'
import { FabricObject } from 'fabric/dist/src/shapes/Object/FabricObject'

export function useTshirt (id: string) {
  return new Tshirt(id, {
    width: 360,
    height: 442,
  }) 
}

export class Tshirt extends Canvas {
  vtext: Ref<string|null> = ref(null)
  
  constructor(id: string, option: Object) {
    super(id, option)

    this.mockup( `/img/mockup/kaos-o-neck-l-pendek/${id}` )
  }

  mockup(url: String){

    loadSVGFromURL(`${url}.svg`, (objects: Array<FabricObject>) => {
      let obj: FabricObject = util.groupSVGElements(objects)
      obj.set({
        _uid: 'svg',
        selectable: false
      })
      this.add(obj);
      
      Image.fromURL(`${url}.png`).then((image: FabricObject) => {
        image.set({
          selectable: false,
          globalCompositeOperation: 'source-atop',
          excludeFromExport: true,
        })
        this.add(image)
        this.renderAll()
      })
    }, null, null);
  }

  text(_text: string) {
    let obj: FabricObject = this.getActiveObject()

    if(obj && obj instanceof Textbox) {
      obj.set({
        text: _text
      })
    }
    else{
      obj = new Textbox(_text, {
        fontSize: 20,
        globalCompositeOperation: 'source-atop'
      })
      this.centerObject(obj)
      this.add( obj )
      this.setActiveObject(obj)
    }
  
    this.renderAll()
    return obj
  }
  
}