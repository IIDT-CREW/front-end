import { useEffect, useState, useMemo } from 'react'
import classNames from 'classnames'
import * as Hangul from 'hangul-js'
const assemble = (slice) => {
  return Hangul.assemble(slice)
}
const TIME_INTERVAL = 100
function timeResist(timeInterval = TIME_INTERVAL) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve('time resist')
    }, timeInterval)
  })
}
type TypingProps = {
  str: string
  handleStatus: (status: 'is_done' | 'is_init') => void
  status: 'is_done' | 'is_init'
}
const TypingTest = ({ str = '타이핑 컴포넌트 입니다', handleStatus, status }: TypingProps) => {
  const [result, setResult] = useState('')

  const disassembled = useMemo(
    () =>
      str
        .trim()
        .split('')
        .map((ch) => Hangul.disassemble(ch)),
    [str],
  )

  useEffect(() => {
    if (!disassembled) return
    async function dis() {
      const array = disassembled
      // ㅍ, 피, 핑, 핑ㅋ, 핑커, 핑컴
      let origin = ''
      let temp = ''
      for (let i = 0; i < array.length; i++) {
        for (let j = 1; j <= array[i].length; j++) {
          const slice = array[i].slice(0, j)
          temp = assemble(slice)
          await timeResist()
          setResult(origin + '' + temp)
        }
        origin += temp
      }
      handleStatus('is_done')
    }
    dis()
  }, [disassembled, handleStatus])

  return (
    <span style={{ height: '100%' }} className={classNames({ 'typing_with-blinking-cursor': status !== 'is_done' })}>
      {result}
    </span>
  )
}
export default TypingTest
