<script setup lang="ts">
import { ref, computed } from 'vue';
import Box from '@/components/Box.vue'
// position of cashout button
let pos = ref({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
})
// rolls
const rolls = ref(['x', 'x', 'x'])
// to specify when machine is spinning
const loading = ref(false)
// to disable cashout btn
const disabled = ref(false)
// creadit of user
const creadit = ref(10)

// cashout button styles
const styles = computed(() => {
  return {
    top: pos.value['top'] + 'px',
    left: pos.value['left'] + 'px',
    right: pos.value['right'] + 'px',
    bottom: pos.value['bottom'] + 'px',

  }
})

// choose randomly in array ; it return choosed element
function randomChoose(choices: Array<any>) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

// main function to start the round
function start() {


  if (creadit.value < 1) {    // when no creadit exist
    return alert('you dont have enough creadit')
  }

  loading.value = true   // to disable start btn

  rolls.value = ['x', 'x', 'x']   // reset rolls to default value

  let realRolls = [] // an array to keep randome values

  realRolls = roll() // get 3 random value

  let cheatedRolls = realRolls

  if (realRolls[0] == realRolls[1] && realRolls[1] == realRolls[2]) {   //if win

    // cheat 
    cheatedRolls = cheat(realRolls)

    // reward
    reward(cheatedRolls[0])

  } else {   //loose
    creadit.value--

  }

  display(cheatedRolls);  // dispaly results

}

// calc reward depend on roll tyle 'cherry' , 'lemon' o ...
// and manipulate creadit 
function reward(v: string) {
  if (v == 'c') {
    creadit.value += 10
  } else if (v == 'l') {
    creadit.value += 20
  }
  else if (v == 'o') {
    creadit.value += 30
  }
  else if (v == 'w') {
    creadit.value += 40
  }
}

// reroll based on probability and return cheated value
function cheat(realRolls: Array<string>) {
  let cheatedRolls = realRolls
  if (creadit.value > 40 && creadit.value < 61 && probability(0.3)) {
    cheatedRolls = roll()  // reroll
  } else if (creadit.value > 60 && probability(0.6)) {
    cheatedRolls = roll()
  }
  return cheatedRolls
}

// display result in 1s step
function display(rollsArr: Array<string>) {

  let i = 0;

  const loop = setInterval(() => {

    rolls.value[i] = rollsArr[i]

    if (i == rollsArr.length - 1) {
      loading.value = false
      clearInterval(loop)
    }

    i++

  }, 1000)

}

// retrun true or false by recieved probability exapmle 0.7
function probability(n: number) {
  return !!n && Math.random() <= n;
};

// when user mouser over cashout btn
function handleHover() {
  // move 
  if (probability(0.5)) {
    const dir = randomChoose(['top', 'left', 'right', 'bottom']) as keyof typeof pos.value 
    pos.value[dir] += 300
  }
  //diable
  if (probability(0.3)) {
    disabled.value = true
  }
}

// return randomized array of rolls
function roll() {
  const symbols = ['c', 'l', 'o', 'w']
  let a = []
  for (let i = 0; i < 3; i++) {
    a.push(randomChoose(symbols))
  }
  return a;
}

// move creadit to user
function cashOut() {
  alert(`Congratulation , you earned ${creadit.value}`)
  creadit.value = 0
}

</script>

<template>
  <main>
    <!-- table  -->
    <table>
      <!-- creadit and start -->
      <thead>
        <tr>
          <th>creadit : </th>
          <th> {{ creadit }}</th>
          <th> <button :disabled="loading" @click="start">start</button></th>
        </tr>
      </thead>
      <!-- main box -->
      <tr>
        <td>
          <Box :choice="rolls[0]" />
        </td>
        <td>
          <Box :choice="rolls[1]" />
        </td>
        <td>
          <Box :choice="rolls[2]" />
        </td>
      </tr>
    </table>
    <!-- cashout btn -->
    <button :disabled="loading || disabled" @mouseover="handleHover" @click="cashOut" :style="styles"
      class="d-relative">cahout</button>

  </main>
</template>

<style>
.d-relative {
  position: relative;
}
</style>