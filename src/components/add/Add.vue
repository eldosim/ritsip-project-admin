<template>
      <!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
       label-width="100px" class="demo-ruleForm add-wrapper"> -->
       <el-form label-width="80px" :rules="addrules" :model="addForm" ref="addForm" 
       class="demo-ruleForm add-wrapper">
    <div class="textarea">
      <el-input 
        style="text-align:right;"
        :autosize="{ minRows: 10}"
         type="textarea"
         placeholder="请输入内容"
         v-model="addForm.textarea">
      </el-input>
    </div>
    <div class="formarea">
      <el-form-item  label="标题" prop="title">
        <el-input v-model="addForm.title" placeholder="请输入文章标题"></el-input>
      </el-form-item>


    <el-form-item label="热度" >
        <el-input width="100px" type="number" v-model="addForm.hot" placeholder="请输入热度"></el-input>
      </el-form-item>

       <el-form-item label="分类" prop="region">
          <el-select v-model="addForm.cate" placeholder="请选择文章分类">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
      </el-form-item>

      <el-form-item label="推荐文章">
        <el-switch v-model="addForm.isrec"></el-switch>
      </el-form-item>
      
      <el-form-item label="付费">
        <el-switch v-model="addForm.ispay"></el-switch>
      </el-form-item>
        <el-form-item label="付费金额">
          <!-- disabled="addForm.ispay" -->
      <el-input  v-model="addForm.projectAmount" type="text"
       placeholder="请输入文章金额" @blur="projectAmounts" clearable :maxlength="32"></el-input>
       </el-form-item>
      <el-image class="base-img" :src="src"></el-image>

    </div>
    </el-form>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
      return {
        src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/wAALCAFhAfQBAREA/8QAGwABAAMAAwEAAAAAAAAAAAAAAAUGBwIDBAH/xABAEAACAQMBAwgHBgUEAgMAAAAAAQIDBAURBiExEkFRVGFxsdEVFiI2kpPhEzJDUoGRFCMzQqFTYnLBJGNzovD/2gAIAQEAAD8A38AEPkdpcfj24Of21Vf2U9+ne+CKzd7Y39ZtW8adCPYuVL92RFfKX9w39td1pdnLeh5W3J6ttvtPgAAAAAAAAAAAAAAAAAAAAAAB2U69ak9adWpB/wC2TRI220eVtmuTdSnH8tRconrHbWnJqN9QcP8AfT3r9izWt5b3tJVberGpB88Wd4AAOi7u6Flbyr3FRQpx4t/9FEzG09zkHKlbuVC24aJ+1Lvf/RAgAAAAAAAAAAAAAAAAAAAAAAAAAA77S9uLGsqttVlTmujg+9c5ecHtNRyOlC4SpXPN+Wfd29hYAAdF3d0bK2ncV5KNOC1fb2Gb5fL18tcuc240o/06eu6K8yOAAAAAAAAAAAAAAAAAAAAAAAAAAAB9TaaabTXBovGzW0P8YlZXcv8AyEvYm/715lnAM92nzDyF67elL/xqL0Wn90udkCAAAAAAAAAAAAAAAAAAAAAAAAAAAADlCcqdSM4ScZxeqa5maVgcrHK4+NRtKtD2ai7en9SUIbaXI+j8TPkPSrW/lw7Ol/sZwAAfYwlOXJhFyl0JanpWOvmtVZ3Hy2PRl/1K4+Wx6Mv+pXHy2PRl/wBSuPlsejL/AKlcfLY9GX/Urj5bHoy/6lcfLY9GX/Urj5bHoy/6lcfLY9GX/Urj5bHoy/6lcfLY9GX/AFK4+Wx6Mv8AqVx8tj0Zf9SuPlsejL/qVx8tj0Zf9SuPlsejL/qVx8tj0Zf9SuPlsejL/qVx8tj0Zf8AUrj5bHoy/wCpXHy2PRl/1K4+Wx6Mv+pXHy2PRl/1K4+Wx6Mv+pXHy2PRl/1K4+Wx6Mv+pXHy2PRl/wBSuPlsejL/AKlcfLY9GX/Urj5bHoy/6lcfLY9GX/Urj5bHoy/6lcfLY9GX/Urj5bHoy/6lcfLY9GX/AFK4+Wx6Mv8AqVx8tj0Zf9SuPlsejL/qVx8tj0Zf9SuPlsejL/qVx8tj0Zf9SuPlsejL/qVx8tj0Zf8AUrj5bHoy/wCpXHy2PRl/1K4+Wx6Mv+pXHy2PRt/1K4+Wzrq2lzRWtW3qwXTKDR0gAExs3kXj8tT5T0pVvYn+vB/uaQUHbG7dfLRoJ+zQhpp2ve/+iugAncBs9PKy+3rNwtYvTVcZvoXmXq0sLWxpqFtQhTS50t772ekAAAAAAAAAAAAAAAAAAAAAAAHxpSWjSa6GQOX2Xtb6EqltGNC44pxWkZd6KFXoVLavOjWg4VIPSSZ1gA1HD3f8diLau3rJwSl3rczOcnXdzlLqtrryqstO7U8gB32dtK8vaNtHjUmo9xqlvQp2tvToUo8mEIqKR2gAAAAAAAAAAAAAAAAAAAAAAAAFR20x8XTpX8I6ST+zqdq5mU0AFt2aysbXFyozfCq9O7RFTb1bb4t6nwAmNloqW0Ntrzcp/wCGaQAAAAAAAADjOcKcXKcoxiueT0R4p5vGU5aSvqGv/PU7KGTsbl6UbujN9CmtT1gAAAAAAAAAAAAAAEPtRFS2eudebktfujNwAdkKsqcdIvdrqdYAJrZX3ht+6XgzRgAAAAAAACt5zamFjKVtaKNS4W6Un92Hmyl3d9dX1Rzua86j6G9y7kecEtjdob/GySVR1aPPTqPVfo+YvmLy1tlbf7WhLSS+/B8Ys9wAAAAAAAAAAAAABE7Te7113LxRmoAAABNbK+8Nv3S8GaMAAAAAAACB2ozDx1kqNGWlxW1Sf5Y87M9bbererAAPXjchWxl7C4ovh96PNJdBp9rc07u1p3FJ6wqRUkdwAAAAAAAAAAAAAInab3euu5eKM1AAAAJrZX3ht+6XgzRgAAAAAAAZptFdu7zlxLXWNN/Zx7l9dSKAABeNirt1LGvayev2UuVHuf1RaAAAAAAAAAAAAAARO03u9ddy8UZqAAAATWyvvDb90vBmjAAAAAAAAyW7bd7Xb4/aS1/c6QAAWnYhv+PulzfZLxLuAAAAAAAAAAAAACJ2m93rruXijNQAAACa2V94bful4M0YAAAAAAAGYZ22dpmrqm1onNzj3PeRwAALpsRbONC5umt05KEf04+JbAAAAAAAAAAAAAARO03u9ddy8UZqAAAATWyvvDb90vBmjAAAAAAAArG12JldW8b2jHWpRWk0ueP0KMAAd1rbVby5p29GPKqTeiRqGPsqePsaVtT4QW99L52eoAAAAa6EJktp7CwbhGTr1V/bT4LvZXLrbHI1m1QjToR5tFyn+7I2pnMpVesr6t+ktPA4xzGSi9VfXHxs9lvtVlaDXKrRqroqRXiiesNs7as1C8pOhL88faj5ostKtTr041KU4zhLhKL1TOYAAAABE7Te7113LxRmoAAABNbK+8Nv3S8GaMAAAAAAAA0mtGtUU3O7KS5crnHR1T3yo9H/AB8ipzhOnNwnFxkuKktGjiD1WOOusjVVO2pSn0y4RXey/YPA0cRS5TaqXEl7dTo7F2EwAAAAcKtWnQpSq1ZqEIrWUnwRQ85tNWv5SoWspUrbhqt0p9/QuwrwAAPdjMtdYqty6E/Yb9qm/uyNDxWVt8rbKrReklunB8Ys94AAAAInab3euu5eKM1AAAAJrZX3ht+6XgzRgAAAAAAAAeW7x1nfLS5t6dTta3/uRk9kcTN6qnUj2RqM7KOy+JoS1/hvtH/7JN/4JanSp0YKFOEYRXBRWiOYAAABwrVqdClKrVmoQitZSfBGe5/P1MrVdKk3C0i90eefayEAAAB6bC/r466jcW8tJLiuaS6GaPictQytqqtJ6TW6dN8YskAAAACJ2m93rruXijNQAAACa2V94bful4M0YAAAAAAAAAAAAAAHCtWp0KUqtWahCK1lJ8EZ7n8/UytV0qTcLSL3R55drIQAAAAHpsL+vjrqNxbz0kuK5pLoZo+Jy1DLWqq0npNbpwfGLJAAAAETtN7vXXcvFGagAAAE1sr7w2/dLwZowAAAAAAAAAAAAABwrVqdClKrVmoQitZSb3JGe5/P1MrVdKk3C1i/Zjzy7WQgAAAAAPTYX9fHXUbi3lpJcVzSXQzR8TlqGWtVVpPSa3TpvjF+RIAAAETtN7vXXcvFGagAAAE1sr7w2/dLwZowAAAAAAAAAAAAAOFatTt6MqtWahTgtZSfMZ5ns/UytZ0qTcLWL9mPPJ9LIUAAFgwGzksk1cXPKharhpuc+7sJXL7I0HbupjouFWK/puWql+/OUuUZQk4yTjJPRp8UfAAD02N9Xx11G4t58mS4rmkuhmj4nLUMtaqpSek1unB8YvyJAAAETtN7vXXcvFGagAAAE1sr7w2/dLwZowAAAAAAAAAAAAB11q1O3ozq1ZqFOC1lJ8xnuez1TK1nTp6wtYv2Y/m7WQoAALDs7s7LITV1dRcbVPcuep9C+whGnBRhFRilokluRyK5tFs7G/jK6tYpXSXtR5qn1KHKMoScZJxkno0+KZ8AAPTY31fHXUbi3nyZLiuaS6GaPictQy1qqlJ6TW6dNvfF+RIAAETtN7vXXcvFGagAAAE1sr7w2/dLwZowAAAAAAOFSrTpLWpUhBdMnoeSWZxsHpK+t0/+aOVPLY+q9IXtBv8A+RHrjKM1rGSa6U9T6AAADrrVqdvRnVqzUKcFrKT5jPc9nqmWrOnT1haxfsx/N2shQAAWHZ3Z2WQmrq6i42qe6PPU+hfYQjCCjFKMUtElwRyAK5tFs7G/i7q1io3SW+PNU+pQ5RlCbjKLjJPRp8UfAAD02N9Xx11G4t58mS4rmkuhmj4jLUMtaqpSfJqLdOm3vi/IkAARO03u9ddy8UZqAAAATWyvvDb90vBmjAAAAAAj8nmbTFU9a89Zv7tOO+TKdf7W3903Gg1bU/8Abvl+5B1a1StJyq1Jzk+eT1OAO+3vLm0lyrevUpv/AGy0LFjtsq9JqF/TVWH+pBaSX6cGXC0vbe+oKtbVY1IPo5u/oO8AA661anb0Z1qs1CnBayk+Yz3PZ6plqzp09YWsX7MfzdrIUAAFi2d2dlfyjdXUXG1T9mPPU+hfIQjCKjFJRS0SXBHIAAru0WzschF3VqlG6S3rmqfUoUoyhNwnFxlF6NPimfAAD02N9Xx91G4t58mceK5muhmjYjL0MtaqpS9mpHdOm3vi/IkQCJ2m93rruXijNQAAACa2V94bful4M0YAAAAAg8/tBDF0nRo6TupLcuaC6WZ/Wr1bitKrWnKdST1cpPedYAAPXjslcYy5Va3np+aL4SXQzRsVlaGVtVWovSS3Tg+MWe8A669anb0Z1qs1CnBayk+YzzPZ6plqzp09YWsX7MfzdrIYAAFi2d2dlfyjdXUWrVP2Y/6n0L5CEYRUYpKKWiS5jkAAAV3aLZ2OQi7m1io3SW9c1ReZQpRlCbhOLjKL0afFM+AAHosb6vj7qNxbz5M48VzNdDNHxGXoZa1VSn7NSO6pTb3xfkSIInab3euu5eKM1AAAAJrZX3ht+6XgzRgAAAAQW0Gfhi6To0Wp3cluXNBdLM/q1Z1qsqtWbnOT1lJ8WzgAAAD1Y/IV8bdRuLeWjXGL4SXQzR8VlKGVtVWovSS3Tg+MWe8669enbUZ1q01CnBayk+YzzPZ6plq32dPWFrF+zH83ayGAABY9ndnZX8o3d1Fq2T9mL/E+he4RjCKjFJRS0SS4HIAAAAru0WzschB3NrFRuoreuaovMoUoyhNwnFxlF6NNb0z4AAeiyvq+Puo3FvPkzjxXM10M0fEZehlrVVKfs1I/1Kbe+L8iRInab3euu5eKM1AAAAJrZX3ht+6XgzRgAAACDz+fp4uk6NLSd1JblzQXSzPqtWpXqyq1Zuc5PWUnxbOAAAAAPVj8hXxt1GvQlo196L4SXQzRLHN2d5jpXn2ipxgv5ik98GUrPZ6plq3IhrC1g/Zj+btZDAAAsezuzsr+Ubu7i1bJ+zF/ifQvcYxhFRikopaJLmOQAAAABXdotnY5CDubZKN1Fb1zVF5lCnCVObhOLjKL0afFM+AAHosr2vj7qNxbz5M4/s10M0fEZehlrVVKekakf6lNvfF+R07Te7113LxRmwAAABNbK+8Nv3S8GaMAAACDz+fp4uk6NJqd1JblzRXSzPqtWpXqyq1Zuc5PWUnxbOAAB9jGUnpFNvoSPnAAAH1SaTSbSfFa8T4AACx7O7OyvpRu7uLVsnrGL/E+he4xjCKjFJRS0SXMcgAAAAACu7Q7OxyEXc2sVG6it65qi8yhThKnOUJxcZRejTW9M+AAHosr2vj7qNxbz5M4/s10MuF/l6GW2VuqlPSNSMY8unrvi9V/go4AAABNbK+8Nv3S8GaMAAAQefz8MXSdKlpO6kty5odrM+q1alerKrVm5zk9ZSfFs4AAHfZ2de+uYW9vBynL/HazRsPhaGJtlGKU60vv1Gt77uwj9odnIX0Hc2kVG5it8VuVT6lDlGUJOMk4yT0afFM+AAAAAsezuzrvpRu7uLVsnrGL/E+he4xjCKjFJJLRJcxyAAAAAAAK9tFs7HIQdzbRUbqK3rmqLzKFOEqc5QnFxlF6NNb0ziAAcozlFSUZNKS0ej4o4gAAAE1sr7w2/dLwZowAAIPP5+ni6TpUmp3UlujzR7WZ9Vq1K9WVWrNznJ6yk+LZwAAO+0tK19cwt7eDlUl/jtZo2Gw1HE23IiuVWl/UqdPZ3EmCubRbOxv4yurWKV0l7Ueap9ShyjKEnGScZJ6NPij4AAACybO7OSvpRu7uLVst8Yv8T6F7jFRioxSSS0SXMfQAAAAAAACvbQ7OxyMHc20VG6it65qi8yhThKnOUJxcZRejTW9M4gAAAAAAmtlfeG37peDNGAAIPP5+ni6TpUmp3U17MeaPazPqtWpXqyq1Zuc5PWUnxZwAAO+0tK19cwt7eDlUl/jtZo2Gw1HE23JjpKtL79Tp7O4kwAVzaLZ2N/F3VrFK6S9qPNU+pQ5RlCTjJOMk9GnxR8AABYNmcHTyVWVxcSi6NJ6fZp75Pt7C/wAYqMVGKSSWiS5j6AAAAAAAAAV7aHZ2ORg7m2SjdRW9c1TsfaUKcJU5yhOLjKL0aa3pnEAAAAAAmtlfeG37peDNGABB5/P08VSdKk1O6mvZj+XtZn1WrUr1ZVas3OcnrKT5zgAAd9paVr65hb28HKpJ/t2s0bDYajibbkx0lWl/UqdPYuwkwAAVzaLZ2N/GV1axSuUvajzVF5lDlGUJOMk4yT0afFHwAA9ePyFfGXUa9CWjW6UXwkuhmj4vKUMpaqtRejW6cHxiz3AAAAAAAAAAr20Oz0cjB3FtFRuor9JrofaUKcJU5yhOLjOL0aa3pnEAAAAAE1sr7w2/dLwZowBB5/P08VS+ypNTupr2Y80e1mfVatSvVlVqzc5yespPizgAAd9paVr65hb28HKpL/HazRsNhqOJtuTHSVaS/mVOnsXYSYAAAK5tFs7G/jK7tIpXSXtR/wBT6lDlGUJOMk1JPRp8x8AAPXjshXxl1GvQlo+EovhJdDNHxeUoZS1Vai9Gt04PjFnuAAAAAAAAABX9odno5GDuLdKN1FfpNdD7SgzhKnOUJxcZxejT4pnEAAAAAmtlfeG37peDNGBCZ/P08VS+ypNTupr2Y/l7WZ7Wq1K9WVWrNzqTespPnOAAB32lpWvbmFChBzqS5ujtZouGwtHEW3JjpOtJfzKnT2LsJQAAAAFc2j2dV/GV3aRSuUvaj/qfUocoyhJxkmpJ6NPmPgAB68dka+Muo16Et/CUXwkuhmj4vKUMpaqtRejW6cHxiz3AAAAAAAAAAr+0Oz0clB3FulG6iu5TXQ+0oM4TpVJQnFxnF6NPimcQAAAATWyvvDb90vBmjEJn8/TxVL7Ok1O6mvZj+XtZntatUr1ZVas3OpN6yk+c4AAHfaWla9uYW9CDnUk9y6O1mi4XDUcRbcmOk60l/MqdPYuwlAAAAAAVvaPZ1X0ZXdpFK5S1lFfifUokouEnGSakno0+Y+AAHrx2Rr4y6jXoS38JRfCS6GaPi8pQylqq1F6NbpwfGLPcAAAAAAAAACv7Q7PRyUHcW6UbqK/Sa6H2lBqQnSqSpzi4zi9HF8UziAAAATOyvvDb90vBlsz+fp4qj9nSandTXsx/L2sz2tWqXFaVWrNzqTespPnOAAB3WlpWvbmFvbwc6kuC6O1mjYXC0cRbcmOk60l/MqdPYuwlAAAAAAAVvaPZ1X0ZXdpFK5S9qK/E+pRJRcZOMk1JPRp8x8AAPXjsjXxl1GvQlv4Si+El0M0fGZShlLVV6L0fCcHxiz3AAAAAAAAAArO1mJoVbKeQiuRWpaatf3rXTeUUAAAA9WPvp467VzSinOMWo68NWtNTorVqlxWlVqzc6k3rKT5zgAAd1paVr25hQoQc6knuXR2s0bC4WjiLbkx0nWkv5lTp7F2EoAAAAAAACt7R7OK+jK7tIpXKWsor8T6lElFxk4yTUk9GnzHwAA9eOyNfGXUa9CW/hKL4SXQzSMXk6GUtFXovfwlB8YvoPaAAAAAAAAARO03u9ddy8UZqAAAAAAAd1paVr25hQoQc6knuXR2s0bC4WjiLbkx0nWkv5lTp7F2EoAAAAAAAACt7R7Oq+jK7tIpXKXtRX4n1KJKLjJxkmpJ6NPmPgAB7sTk6uKvY16bbi91SH5kabb16d1b069KXKpzipJnaAAAAAAAACJ2m93rruXijNQAA1o9AAAADutbWte3MKFCDnUk9y/7NGwuFo4i20jpOvNfzKmnHsXYSgAAAAAAAAAK3tHs4r6Mru0ilcpayivxPqUSUXGTjJNNPRp8x8AALjsXkW41bCb+77dPu50W8AAAAAAAAERtO0tnrrXoj4ozYAHKMJSWqR35Ci7fI3NJr7lSS/wAnmAAAO61ta17cwoUIOdST3L/s0bC4WjiLfRaTryX8yppx7F2EoAAAAAAAAAACtbR7OK9jK8tIpXKXtQX4n1KLKLjJxkmmno0+Y+AAkMJcu0zNrV10XLUZdz3GoAAAAAAAAAq22l9GnZ07KL9upLlSXRFfXwKQACzbP4j+Nx0qzX4jS/ZHn2utP4fNSqpezXipLv4MgQAAd1ra1r25hQoQc6knuX/Zo2FwtHE22i0nXkv5lTp7F2EoAAAAAAAAAAACq7V4SlO3qZGilGrDfUS4SXT3lJAByhJxnGS4ppmuQfKpxfSkzkAAAAAAACLy2ctMXSfLmp1v7aUXvff0Gd3t5Wv7udzXlrOb/RLoR5wAadgbR2WFtqTWknHlS73vPHtZj3eYp1YR1q275a0548//AO7DPQAAeqyyN1j3J2tX7Ny4tRTf+T2es2X65L4Y+Q9Zsv1yXwx8h6zZfrkvhj5D1my/XJfDHyHrNl+uS+GPkPWbL9cl8MfIes2X65L4Y+Q9Zsv1yXwx8h6zZfrkvhj5D1my/XJfDHyHrNl+uS+GPkPWbL9cl8MfIes2X65L4Y+Q9Zsv1yXwx8h6zZfrkvhj5D1my/XJfDHyHrNl+uS+GPkPWbL9cl8MfIes2X65L4Y+Q9Zsv1yXwx8h6zZfrkvhj5D1my/XJfDHyHrNl+uS+GPkPWbL9cl8MfIes2X65L4Y+R1XGeyd1QnQrXUpU5rSUeSlr/gjgACVW0uXSSV5LRbvux8j76zZfrkvhj5D1my/XJfDHyHrNl+uS+GPkPWbL9cl8MfIes2X65L4Y+Q9Zsv1yXwx8h6zZfrkvhj5D1my/XJfDHyHrNl+uS+GPkPWbL9cl8MfIes2X65L4Y+Q9Zsv1yXwx8h6zZfrkvhj5D1my/XJfDHyHrNl+uS+GPkdVbPZWvFxne1dHzRfJ8CPbcm3Jtt8Wz4ACSwWPeRytKk1rTi+XU/4o07gfGk001qnxRm+0GJli8g+Qn/D1W5U30dK/QiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEm2klq2aNs1ifRlhyqi0uK2kp9i5kTQPJksfRydnO3rLc98Zc8X0ozTIY+vjbqVCvHRr7suaS6UeUAAAAAAAAAAAAAAAAAAAAAAAAAAAAt+y+z75UcheQ0030qcl/wDZ/wDRcQAePJYy2yls6NxHX8slxi+lGf5bBXeKm3OLqUNfZqxW79egiwAAAAAAAAAAAAAAAAAAAAAAAAAAc6VKpWqRp0oSnOT0UYrVsuWC2UVBxucglKot8aXFR7+llrAABxnCM4uM4qUXuaa1TK7kdj7S5bqWknb1H/bprF/pzFZu9m8paNt27qwX91L2v8cSLnTnTlpOEovoktDiAAAAAAAAAAAAAAAAAAAAAAAAem3x17dvSha1Z9qi9P3J6x2MuqrUryrGjD8sfal5Frx+Is8ZDS2pJSfGb3yf6nuAAAABDZ3+gzP7r+qzoAAAAAAAAAAAAAAAAAAAAAAALBgv60S+0v6aOYAAP//Z',
        addForm: {
          title: '',
          cate:'',
          hot:'',
          textarea:'',
          projectAmount:'',
          ispay:true,
          isrec:true
        },
        addrules: {
          title: [
            { required: true, message: '请输入文章标题', trigger: 'blur' },
            { min: 3, max: 64, message: '长度在 4 到 64 个字符', trigger: 'blur' }
          ]
        }
      };
    },
    methods:{
      toThousandsNoZero(num) {    
         return num ? ( (isNaN(parseFloat(num.toString().replace(/,/g, ""))) ? 1 :
          parseFloat(num.toString().replace(/,/g, "")))).toFixed(2)
          .toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
          return $1 + ",";
        }) : "";
    },
    projectAmounts(){//this.form.projectAmount 金额
     if(isNaN(parseFloat(this.addForm.projectAmount))){
       this.addForm.projectAmount= 0.00;
     }else{
       this.addForm.projectAmount=this.toThousandsNoZero(this.addForm.projectAmount);
     }
    },


    }
}
</script>

<style>
  .add-wrapper{
    background-color: #F8F9FB;
    display: flex;
    margin-top:10px;
    flex-wrap: wrap;
  }

  .textarea,
  .formarea{
    flex:1;
    box-sizing: border-box;
  }
  .textarea{
    padding: 40px;
  }
  .formarea{
    padding: 40px 0;
    padding-right: 40px;
  }

  .base-img{
    width: 90px;
    height: 90px;
    margin-left:80px;
  }

</style>
