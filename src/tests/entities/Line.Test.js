/* eslint-disable no-undef */
import { expect } from 'chai'
import Line from '../../entities/Line.js'

describe('Line', () => {
  it('should create a new Line object', () => {
    const line = new Line('RgTya', 64075909, '70ad29aacf0b690b0467fe2b2767f765')
    expect(line.text).to.equal('RgTya')
    expect(line.number).to.equal(64075909)
    expect(line.hex).to.equal('70ad29aacf0b690b0467fe2b2767f765')
  })
})
