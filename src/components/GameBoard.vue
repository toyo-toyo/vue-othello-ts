<template>
  <div class="game-board" ref="toyotoyo">
    <template v-for="(v, x) in cells">
      <game-cell
        class="game-cell"
        v-for="(cell, y) in v"
        :key="`${x}_${y}`"
        :owner="cell.owner"
        :put="cell.put"
        :style="{
          width: 98 / BOARD_SIZE + '%'
        }"
        @click="placeStone(x, y)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {
  createComponent,
  ref,
  computed,
  onMounted
} from "@vue/composition-api";
import GameCell from "./GameCell.vue";

type Player = 1 | -1;
type Owner = Player | 0;
interface CellState {
  owner: Owner;
  put: boolean;
}
interface GameState {
  cells: CellState[][];
  turn: Player;
}

/** Player1を示す定数 */
const P1: Player = 1;
/** Player2を示す定数 */
const P2: Player = -1;
/** まだ石が置かれていないセル */
const BLANK: Owner = 0;
/** プレイヤー毎の置かれる石（文字） */
const STONES = { [P1]: "黒", [P2]: "白" };
/** 盤面のサイズ(偶数のみ) */
const BOARD_SIZE = 4;
/** 引っ繰り返す方向は8方向なので定義しておく */
const OFFSET = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

export default createComponent({
  components: { GameCell },
  setup(props, ctx) {
    const cells = ref<CellState[][]>(
      Array(BOARD_SIZE)
        .fill(0)
        .map(_ =>
          Array(BOARD_SIZE)
            .fill(0)
            .map(_ => ({ owner: BLANK, put: false }))
        )
    );
    // 初期配置
    const ini1 = BOARD_SIZE / 2 - 1;
    const ini2 = BOARD_SIZE / 2;
    cells.value[ini1][ini1].owner = P2;
    cells.value[ini1][ini2].owner = P1;
    cells.value[ini2][ini1].owner = P1;
    cells.value[ini2][ini2].owner = P2;
    let turn = ref<Player>(P1);

    const winner = computed<Player | undefined>(() => {
      let winnerPName: Player | undefined;
      const stoneCnt = cells.value.reduce(
        (a, b) => a + b.reduce((p, x) => p + x.owner, 0),
        0
      );
      if (stoneCnt > 0) {
        winnerPName = P1;
      } else if (stoneCnt < 0) {
        winnerPName = P2;
      }
      return winnerPName;
    });
    const isGameEnded = computed<boolean>(() => {
      return (
        cells.value.filter(v => v.filter(cell => cell.owner === BLANK).length)
          .length === 0
      );
    });

    const placeStone = (x: number, y: number) => {
      if (isGameEnded.value) {
        return;
      }
      if (cells.value[x][y].owner !== BLANK) {
        return;
      }
      let flippables = checkStone(x, y);
      if (flippables.length == 0) {
        return;
      }
      flippables.map(v => {
        for (const [dx, dy] of v) {
          // 返せるところを返していく
          cells.value[dx][dy].owner = turn.value;
        }
      });
      cells.value[x][y].owner = turn.value;
      // ターン交代
      turn.value = turn.value === P1 ? P2 : P1;
      if (isGameEnded.value) {
        // どちらかの勝ち or 引き分け
        ctx.emit("gameEnd", winner.value ? STONES[winner.value] : 0);
      } else {
        if (checkAllStone() == 0) {
          // 置けない場合はターン交代
          turn.value = turn.value === P1 ? P2 : P1;
          if (checkAllStone() == 0) {
            // どちらも置けない場合終了
            ctx.emit("gameEnd", winner.value ? STONES[winner.value] : 0);
            return;
          }
        }
        ctx.emit("nextTurn", STONES[turn.value]);
      }
    };
    /** 指定のセルに現在のプレイヤーの石を置いたとして、
     * ひっくり返せる石を返却する。
     */
    const checkStone = (x: number, y: number) => {
      let flippables: number[][][] = new Array();
      if (cells.value[x][y].owner !== BLANK) {
        return flippables;
      }
      for (const [dx, dy] of OFFSET) {
        let tmp: number[][] = new Array();
        let depth = 0;
        let rx: number, ry: number, request: number;
        for (;;) {
          depth++;
          rx = x + dx * depth;
          ry = y + dy * depth;
          if (0 <= rx && rx < BOARD_SIZE && 0 <= ry && ry < BOARD_SIZE) {
            request = cells.value[rx][ry].owner;
            if (request == BLANK) break;
            if (request == turn.value) {
              if (tmp.length != 0) {
                flippables.push(tmp);
              }
              break;
            } else {
              tmp.push([rx, ry]);
            }
          } else {
            break;
          }
        }
      }
      return flippables;
    };

    /** ひっくり返せるマスの枠色を変更し
     * 駒を置ける数を返却
     */
    const checkAllStone = () => {
      // 置ける位置のカウント
      let putCnt = 0;
      cells.value.map((v, x) =>
        v.map((cell, y) => {
          cell.put = checkStone(x, y).length > 0;
          if (cell.put) {
            putCnt++;
          }
        })
      );
      return putCnt;
    };
    onMounted(() => {
      // 最初のターンを通知するためにイベントを発行
      ctx.emit("nextTurn", STONES[turn.value]);
    });

    // 最後にテンプレートから参照される物を全て返す
    return {
      cells,
      turn,
      winner,
      isGameEnded,
      placeStone,
      BOARD_SIZE
    };
  }
});
</script>

<style lang="scss" scoped>
.game-board {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .game-cell {
    box-sizing: border-box;
    // width: 16%;
    font-size: 100px;
    text-align: bottom;
    line-height: 100%;
    &::before {
      content: "";
      padding-top: 100%;
      display: block;
    }
  }
}
</style>
