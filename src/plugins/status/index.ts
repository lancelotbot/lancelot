import { Context } from 'koishi'
import { VERSION } from '../../bot'
import os from 'os'
import { reply } from '../../utils'

export default {
  name: 'status',
  apply(ctx: Context) {
    ctx
      .command('status', '查询Bot运行状态')
      .shortcut('状态')
      .action(({ session }) => {
        const uptimeSeconds = Math.floor(process.uptime())
        const uptimeMinutes = Math.floor(uptimeSeconds / 60)
        const uptimeHours = Math.floor(uptimeMinutes / 60)
        const uptimeDays = Math.floor(uptimeHours / 24)
        let uptimeStr = ''
        if (uptimeDays) uptimeStr += uptimeDays + 'd'
        if (uptimeHours) uptimeStr += (uptimeHours % 24) + 'h'
        if (uptimeMinutes) uptimeStr += (uptimeMinutes % 60) + 'm'
        uptimeStr += (uptimeSeconds % 60) + 's'

        const totalFreememMb = os.freemem() / 1024 / 1024
        const totalmemMb = os.totalmem() / 1024 / 1024

        const totalUsedmemMb = totalmemMb - totalFreememMb
        const totalUsedMemRate = ((totalUsedmemMb / totalmemMb) * 100).toFixed(2)
        const processUsedmemMb = process.memoryUsage.rss() / 1024 / 1024
        const processUsedMemRate = ((processUsedmemMb / totalmemMb) * 100).toFixed(2)

        return (
          reply(session) +
          `lancelot.bot ver.${VERSION}\n` +
          'Powered by Koishi.js v4\n\n' +
          //
          `运行时间：${uptimeStr}\n` +
          `运行平台：${os.type()} ${os.release()} ${os.arch()}\n` +
          `进程内存：${processUsedmemMb.toFixed()}M (${processUsedMemRate}%)\n` +
          `系统内存：${totalUsedmemMb.toFixed()}M / ${totalmemMb.toFixed()}M (${totalUsedMemRate}%)\n` +
          `Node版本：${process.version}\n\n` +
          //
          `Bot反馈群：883632773`
        )
      })
  },
}
