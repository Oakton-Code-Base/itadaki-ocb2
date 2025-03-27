import './createPost.js';
import { Devvit, RedisClient, useState, useWebView } from '@devvit/public-api';
//import { useEffect } from 'react';
import type { DevvitMessage, WebViewMessage } from './message.js';
import { JishoUtil } from './util/jishoUtil.js'; // Import the JishoUtil class for fetching words
import RedisUtil from './util/redisUtil.js';
import { Word } from './util/word.js';
import jishoFetch, {randomKanji} from './util2/jishoFetch.js';

Devvit.configure({
  redditAPI: true,
  redis: true,
  http: true,
  scheduler: true,
});

Devvit.addSchedulerJob({
	name: 'getWeeklyKanji',
	onRun: async (event, context) => {

    let importantKanji:string = "安一飲右雨駅円火花下何会外学間気九休魚金空月見言古五後午語校口行高国今左三山四子耳時七車社手週十出書女小少上食新人水生西川千先前足多大男中長天店電土東道読南ニ日入年買白八半百父分聞母北木本毎話会同事自社発者地業方新場員立開手力問代明動京目通言理体田主題意不作用度強公持野以思家世多正安院心界教文元重近考画海売知道集別物使品計死特私始朝運終台広住真有口少町料工建空急止送切転研足究楽起着店病質待試族銀早映親験英医仕去味写字答夜音注帰古歌買悪図週室歩風紙黒花春赤青館屋色走秋夏習駅洋旅服夕借曜飲肉貸堂鳥飯勉冬昼茶弟牛魚兄犬妹姉漢政議民連対部合市内相定回選米実関決全表戦経最現調化当約首法性要制治務成期取都和機平加受続進数記初指権支産点報済活原共得解交資予向際勝面告反判認参利組信在件側任引求所次昨論官増係感情投示変打直両式確果容必演歳争談能位置流格疑過局放常状球職与供役構割費付由説難優夫収断石違消神番規術備宅害配警育席訪乗残想声念助労例然限追商葉伝働形景落好退頭負渡失差末守若種美命福望非観察段横深申様財港識呼達良候程満敗値突光路科積他処太客否師登易速存飛殺号単座破除完降責捕危給苦迎園具辞因馬愛富彼未舞亡冷適婦寄込顔類余王返妻背熱宿薬険頼覚船途許抜便留罪努精散静婚喜浮絶幸押倒等老曲払庭徒勤遅居雑招困欠更刻賛抱犯恐息遠戻願絵越欲痛笑互束似列探逃遊迷夢君閉緒折草暮酒悲晴掛到寝暗盗吸陽御歯忘雪吹娘誤洗慣礼窓昔貧怒泳祖杯疲皆鳴腹煙眠怖耳頂箱晩寒髪忙才靴恥偶偉猫幾党協総区領県設改府査委軍団各島革村勢減再税営比防補境導副算輸述線農州武象域額欧担準賞辺造被技低復移個門課脳極含蔵量型況針専谷史階管兵接細効丸湾録省旧橋岸周材戸央券編捜竹超並療採森競介根販歴将幅般貿講林装諸劇河航鉄児禁印逆換久短油暴輪占植清倍均億圧芸署伸停爆陸玉波帯延羽固則乱普測豊厚齢囲卒略承順岩練軽了庁城患層版令角絡損募裏仏績築貨混昇池血温季星永著誌庫刊像香坂底布寺宇巨震希触依籍汚枚複郵仲栄札板骨傾届巻燃跡包駐弱紹雇替預焼簡章臓律贈照薄群秒奥詰双刺純翌快片敬悩泉皮漁荒貯硬埋柱祭袋筆訓浴童宝封胸砂塩賢腕兆床毛緑尊祝柔殿濃液衣肩零幼荷泊黄甘臣浅掃雲掘捨軟沈凍乳恋紅郊腰炭踊冊勇械菜珍卵湖喫干虫刷湯溶鉱涙匹孫鋭枝塗軒毒叫拝氷乾棒祈拾粉糸綿汗銅湿瓶咲召缶隻脂蒸肌耕鈍泥隅灯辛磨麦姓筒鼻粒詞胃畳机膚濯塔沸灰菓帽枯涼舟貝符憎皿肯燥畜挟曇滴伺氏統保第結派案策基価提挙応企検藤沢裁証援施井護展態鮮視条幹独宮率衛張監環審義訴株姿閣衆評影松撃佐核整融製票渉響推請器士討攻崎督授催及憲離激摘系批郎健盟従修隊織拡故振弁就異献厳維浜遺塁邦素遣抗模雄益緊標宣昭廃伊江僚吉盛皇臨踏壊債興源儀創障継筋闘葬避司康善逮迫惑崩紀聴脱級博締救執房撤削密措志載陣我為抑幕染奈傷択秀徴弾償功拠秘拒刑塚致繰尾描鈴盤項喪伴養懸街契掲躍棄邸縮還属慮枠恵露沖緩節需射購揮充貢鹿却端賃獲郡併徹貴衝焦奪災浦析譲称納樹挑誘紛至宗促慎控智握宙俊銭渋銃操携診託撮誕侵括謝駆透津壁稲仮裂敏是排裕堅訳芝綱典賀扱顧弘看訟戒祉誉歓奏勧騒閥甲縄郷揺免既薦隣華範隠徳哲杉釈己妥威豪熊滞微隆症暫忠倉彦肝喚沿妙唱阿索誠襲懇俳柄驚麻李浩剤瀬趣陥斎貫仙慰序旬兼聖旨即柳舎偽較覇詳抵脅茂犠旗距雅飾網竜詩繁翼潟敵魅嫌斉敷擁圏酸罰滅礎腐脚潮梅尽僕桜滑孤炎賠句鋼頑鎖彩摩励縦輝蓄軸巡稼瞬砲噴誇祥牲秩帝宏唆阻泰賄撲堀菊絞縁唯膨矢耐塾漏慶猛芳懲剣彰棋丁恒揚冒之倫陳憶潜梨仁克岳概拘墓黙須偏雰遇諮狭卓亀糧簿炉牧殊殖艦輩穴奇慢鶴謀暖昌拍朗寛覆胞泣隔浄没暇肺貞靖鑑飼陰銘随烈尋稿丹啓也丘棟壌漫玄粘悟舗妊熟旭恩騰往豆遂狂岐陛緯培衰艇屈径淡抽披廷錦准暑磯奨浸剰胆繊駒虚霊帳悔諭惨虐翻墜沼据肥徐糖搭盾脈滝軌俵妨擦鯨荘諾雷漂懐勘栽拐駄添冠斜鏡聡浪亜覧詐壇勲魔酬紫曙紋卸奮欄逸涯拓眼獄尚彫穏顕巧矛垣欺釣萩粛栗愚嘉遭架鬼庶稚滋幻煮姫誓把践呈疎仰剛疾征砕謡嫁謙后嘆菌鎌巣頻琴班棚潔酷宰廊寂辰霞伏碁俗漠邪晶墨鎮洞履劣那殴娠奉憂朴亭淳怪鳩酔惜穫佳潤悼乏該赴桑桂髄虎盆晋穂壮堤飢傍疫累痴搬晃癒桐寸郭尿凶吐宴鷹賓虜陶鐘憾猪紘磁弥昆粗訂芽庄傘敦騎寧循忍怠如寮祐鵬鉛珠凝苗獣哀跳匠垂蛇澄縫僧眺亘呉凡憩媛溝恭刈睡錯伯笹穀陵霧魂弊妃舶餓窮掌麗綾臭悦刃縛暦宜盲粋辱毅轄猿弦稔窒炊洪摂飽冗桃狩朱渦紳枢碑鍛刀鼓裸猶塊旋弓幣膜扇腸槽慈楊伐駿漬糾亮墳坪紺娯椿舌羅峡俸厘峰圭醸蓮弔乙汁尼遍衡薫猟羊款閲偵喝敢胎酵憤豚遮扉硫赦窃泡瑞又慨紡恨肪扶戯伍忌濁奔斗蘭迅肖鉢朽殻享秦茅藩沙輔媒鶏禅嘱胴迭挿嵐椎絹陪剖譜郁悠淑帆暁傑楠笛玲奴錠拳翔遷拙侍尺峠篤肇渇叔雌亨堪叙酢吟逓嶺甚喬崇漆岬癖愉寅礁乃洲屯樺槙姻巌擬塀唇睦閑胡幽峻曹詠卑侮鋳抹尉槻隷禍蝶酪茎帥逝汽琢匿襟蛍蕉寡琉痢庸朋坑藍賊搾畔遼唄孔橘漱呂拷嬢苑巽杜渓翁廉謹瞳湧欣窯褒醜升殉煩巴禎劾堕租稜桟倭婿慕斐罷矯某囚魁虹鴻泌於赳漸蚊葵厄藻禄孟嫡尭嚇巳凸暢韻霜硝勅芹杏棺儒鳳馨慧愁楼彬匡眉欽薪褐賜嵯綜繕栓翠鮎榛凹艶惣蔦錬隼渚衷逐斥稀芙詔皐雛惟佑耀黛渥憧宵妄惇脩甫酌蚕嬉蒼暉頒只肢檀凱彗謄梓丑嗣叶汐絢朔伽畝抄爽黎惰蛮冴旺萌偲壱瑠允侯蒔鯉弧遥舜瑛附彪卯但綺芋茜凌皓洸毬婆緋鯛怜邑倣碧啄穣酉悌倹柚繭亦詢采紗賦眸玖弐錘諄倖痘笙侃裟洵爾耗昴銑莞伶碩宥滉晏伎朕迪綸且竣晨吏燦麿頌箇楓琳梧哉澪匁晟衿凪梢丙颯茄勺恕蕗瑚遵瞭燎虞柊侑謁斤嵩捺蓉茉袈燿誼冶栞墾勁菖旦椋叡紬胤凜亥爵脹麟莉汰瑶瑳耶椰絃丞璃奎塑昂柾熙菫諒鞠崚濫捷";

    let weeklyChars: Array<string> = [];
    //count stores how many characters are currently in weeklyChars
    let count = 0;
    while(count < 7){
      let randomCharacter: string = importantKanji[Math.floor(Math.random() * importantKanji.length)];

      if(weeklyChars.includes(randomCharacter))
        continue;
      
      weeklyChars.push(randomCharacter);
      ++count;
    }
      
    let count2 = 0;
    while (count2 < 7){

      try {
        await context.redis.set(`kanjiday${count2}`, weeklyChars[count2]);
        ++count2;
      } catch (error) {
        console.error("failed to update weeklyKanji database", error);
      }
    }
    
    		// Tomorrow at midnight (the morning)
		let scheduledDate: Date = new Date();
		scheduledDate.setUTCDate(1);
		scheduledDate.setUTCHours(0, 0, 0, 0);

		// Schedule this task again for tomorrow
		context.scheduler.runJob({
			name: 'getWeeklyKanji',
			runAt: scheduledDate,
		});
	}
});

Devvit.addMenuItem({
  label: "Select new weekly kanji",
  location: "subreddit",
  forUserType: "moderator",
  onPress: async (event, context) => {
    const location = event.location;
    const targetId = event.targetId;

    context.scheduler.runJob({
      name: 'getWeeklyKanji',
      runAt: new Date(),
    })

    context.ui.showToast({text: "Refreshed Weekly Kanji!"});
  },
});

Devvit.addSchedulerJob({
  name: "getDailyWords",
  onRun: async (event, context) => {
    await context.redis.del("todaysWords");
    const date = new Date();
    const currentDay = date.getUTCDay();
    // console.log(currentDay);
    let kanji = null;

    try{
      kanji = await context.redis.get(`kanjiday${currentDay}`);
    } catch (error) {
      console.error("failed to get kanjis in getDailyWords", error);
    }

    // console.log(kanji);

    const japaneseWords: Record<string, string[]> = await jishoFetch(kanji);

    /* console.log(japaneseWords); */

    const stringifiedMap = JSON.stringify(japaneseWords);

    // console.log(stringifiedMap);

    try {
      await context.redis.set("todaysWords", stringifiedMap);
    } catch (error) {
      console.error("failed to updated todaysWords database", error);
    }
    
    let scheduledDate: Date = new Date();
    scheduledDate.setUTCDate((currentDay + 1) % 7);
    scheduledDate.setUTCHours(0, 0, 10, 0);
    
    context.scheduler.runJob({
      name: 'getDailyWords',
      runAt: scheduledDate,
    });
  }
});

Devvit.addCustomPostType({
  name: 'sushisushi',
  height: 'tall',
  render: (context) => {

    const [newPage, change] = useState('home.html'); // Use state for page switches

    // const [leaderboard, setLeaderboard] =  useState<Array<{member: string; score: number}>>([]);

    const [day, setDay] = useState(new Date().getUTCDay());

    const [username, setUsername] = useState(async () => {
      return await context.reddit.getCurrentUsername();
    });

    const webView = useWebView<WebViewMessage, DevvitMessage>({
      url: newPage, // URL of your web view content

      // Handle messages sent from the web view
      async onMessage(message, webView) {
        switch(message.type){

          case 'fetchWords':

            context.scheduler.runJob({
              name: 'getDailyWords',
              runAt: new Date(),
            });

            let rawData = null;
            while(!rawData || rawData === ""){
              console.log("waiting for data...");
              rawData = await context.redis.get("todaysWords");
            }

            
            // console.log(rawData);
            const parsedData: Record<string, string[]> = JSON.parse(rawData);

            // console.log(parsedData);
            webView.postMessage({
              type: "dailyText",
              data: {text: `Today's Kanji: ${Object.keys(parsedData)[0]} - "${parsedData[Object.keys(parsedData)[0]][0]}"`},
            })

            webView.postMessage({
              type: "updateWords",
              data: {
                words: parsedData,
              }
            });
            break;

          case 'fetchWords2':
            
            // context.scheduler.runJob({
            //   name: 'getWeeklyKanji',
            //   runAt: new Date(),
            // });
            //
            // for(let i = 0; i < 7; i++){
            //   const kanji = await context.redis.get(`kanjiday${i}`);
            //   console.log(kanji);
            // }
            
            break;

          case 'fetchLeaderboard':
            const highScore = await context.redis.zScore("leaderboard", username);
            const currRank = await context.redis.zRank("leaderboard", username, {WITHSCORE: true});
            const currLeaderboardLength = await context.redis.zCard("leaderboard");
            const currLeaderboard = await context.redis.zRange("leaderboard", currLeaderboardLength - 100, currLeaderboardLength - 1, {BY: 'SCORE', WITHSCORES: true});
            let updatedLeaderboard = null;

            try {

              const leaderboardWithScores = await Promise.all(
                currLeaderboard.map(async (player) => ({
                  username: player.member,
                  score: player.score,
                }))
              )

              if (currRank < currLeaderboardLength - 99)
              {
                const newEntry = {
                  username: username,
                  score: highScore,
                }
                updatedLeaderboard = [newEntry,...leaderboardWithScores];
              }
              else
              {
                updatedLeaderboard = leaderboardWithScores;
              }  

              webView.postMessage({
                type: 'updateLeaderboard',
                data: {leaderboard: updatedLeaderboard, rank: currLeaderboardLength - currRank},
              })

            } catch(error){
              console.log(error);
            }
            break;
            
          //going to make this case happen when player completes a game
          case 'addBoardEntry':
            for(let i = 0; i < message.data.length; i++)
            {
              await context.redis.zAdd("leaderboard", message.data[i]);
            }
            break;

          case 'removeBoardEntry':
            await context.redis.del("leaderboard");
            break;
            

          case 'initialDataRequested':
            webView.postMessage({
              type: 'initialDataRecieved',
              data: {username: username}, 
            })
            break;

          default:
            throw new Error('Unknown Message Type');
            break;
        }
        
      },
      onUnmount() {
        context.ui.showToast('Web view closed!');
      },
    });
    //
    // function switchPage(newPage: string) {
    //   change(newPage); // Update the state
    //   webView.mount(); // Mount the web view to load the new page
    // }

    // Function to handle page switching
      /*const handlePageSwitch = (newPage: string) => {
      setSwitchPage(newPage); // Update the state
      console.log(newPage);
      //webView.mount();
      //console.log('after' + newPage);

      //printing works correctly but not the webview its delayed
      
    };*/

    /*useEffect(()=>{
      webView.mount();
      console.log('after ' + switchPage);
    }, [switchPage]);*/

    // Render the custom post type
    return (
      <vstack height="100%" width="100%" alignment="center" gap="small" backgroundColor="#333445">
        <hstack height="25%" width="100%" alignment="top center" />

        <hstack height="30%" width="100%" alignment="top center">
          <image
            url="home.png"
            description="itadaki"
            imageHeight={30}
            imageWidth={256}
            height="100px"
            width="500px"
          />

        </hstack>

        <hstack height="20%" width="100%" alignment="top center">
          <button
           appearance='bordered'
           onPress={() => webView.mount()}>
              Play Game
            </button>
        </hstack>
    

       {/* <hstack height="42%" width="100%" alignment="top center" gap="none">
          <image
            onPress={() => handlePageSwitch('rapid.html')} // Use the handler to switch pages
            url="rapid.png"
            description="rapid"
            imageHeight={30}
            imageWidth={380}
            height="170px"
            width="280px"
          />
          <image
            onPress={() => handlePageSwitch('daily.html')} // Use the handler to switch pages
            url="daily.png"
            description="daily"
            imageHeight={30}
            imageWidth={380}
            height="170px"
            width="280px"
          />
        </hstack>

        <hstack height="12%" width="100%" alignment="top center" gap="none">
          <image
            onPress={() => handlePageSwitch('leaderboard.html')} // Use the handler to switch pages
            url="leaderboard.png"
            description="leaderboard"
            imageHeight={30}
            imageWidth={380}
            height="50px"
            width="400px"
          />
        </hstack>

        <hstack height="12%" width="100%" alignment="top center" gap="none">
          <image
            onPress={() => handlePageSwitch('howTo.html')} // Use the handler to switch pages
            url="howto.png"
            description="how to"
            imageHeight={30}
            imageWidth={380}
            height="50px"
            width="400px"
          />
        </hstack>*/}
      </vstack>
    );
  },
});

export default Devvit;
