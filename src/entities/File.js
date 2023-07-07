import Line from './Line.js'

class File {
  constructor (file, lines = []) {
    this.file = file
    this.lines = lines.map((line) => new Line(line.text, line.number, line.hex))
  }

  addLine (line) {
    this.lines.push(new Line(line.text, line.number, line.hex))
  }

  removeLine (line) {
    const index = this.lines.findIndex((l) => l.text === line.text && l.number === line.number && l.hex === line.hex)
    if (index !== -1) {
      this.lines.splice(index, 1)
    }
  }
}

export default File
