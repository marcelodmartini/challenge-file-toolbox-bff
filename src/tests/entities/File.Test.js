/* eslint-disable no-undef */
import { expect as _expect } from 'chai'
import File from '../../entities/File.js'
import Line from '../../entities/Line.js'

const expect = _expect

describe('File', () => {
  it('should create a new File object with lines', () => {
    const lines = [
      { text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' }
      // ... add more lines here
    ]

    const file = new File('file1.csv', lines)
    expect(file.file).to.equal('file1.csv')
    expect(file.lines).to.be.an('array')
    expect(file.lines[0]).to.be.an.instanceOf(Line)
    expect(file.lines[0].text).to.equal('RgTya')
    expect(file.lines[0].number).to.equal(64075909)
    expect(file.lines[0].hex).to.equal('70ad29aacf0b690b0467fe2b2767f765')
  })

  it('should add a new line to the file', () => {
    const file = new File('file1.csv')
    const line = { text: 'New Line', number: 12345678, hex: 'abcdef1234567890' }
    file.addLine(line)
    expect(file.lines.length).to.equal(1)
    expect(file.lines[0]).to.be.an.instanceOf(Line)
    expect(file.lines[0].text).to.equal('New Line')
    expect(file.lines[0].number).to.equal(12345678)
    expect(file.lines[0].hex).to.equal('abcdef1234567890')
  })

  it('should remove a line from the file', () => {
    const lines = [
      { text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' },
      { text: 'Line2', number: 12345678, hex: 'abcdef1234567890' }
    ]
    const file = new File('file1.csv', lines)
    const lineToRemove = { text: 'RgTya', number: 64075909, hex: '70ad29aacf0b690b0467fe2b2767f765' }
    file.removeLine(lineToRemove)
    expect(file.lines.length).to.equal(1)
    expect(file.lines[0]).to.be.an.instanceOf(Line)
    expect(file.lines[0].text).to.equal('Line2')
    expect(file.lines[0].number).to.equal(12345678)
    expect(file.lines[0].hex).to.equal('abcdef1234567890')
  })
})
