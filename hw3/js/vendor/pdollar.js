/**
 * The $P Point-Cloud Recognizer (JavaScript version)
 *
 * 	Radu-Daniel Vatavu, Ph.D.
 *	University Stefan cel Mare of Suceava
 *	Suceava 720229, Romania
 *	vatavu@eed.usv.ro
 *
 *	Lisa Anthony, Ph.D.
 *      UMBC
 *      Information Systems Department
 *      1000 Hilltop Circle
 *      Baltimore, MD 21250
 *      lanthony@umbc.edu
 *
 *	Jacob O. Wobbrock, Ph.D.
 * 	The Information School
 *	University of Washington
 *	Seattle, WA 98195-2840
 *	wobbrock@uw.edu
 *
 * The academic publication for the $P recognizer, and what should be 
 * used to cite it, is:
 *
 *	Vatavu, R.-D., Anthony, L. and Wobbrock, J.O. (2012).  
 *	  Gestures as point clouds: A $P recognizer for user interface 
 *	  prototypes. Proceedings of the ACM Int'l Conference on  
 *	  Multimodal Interfaces (ICMI '12). Santa Monica, California  
 *	  (October 22-26, 2012). New York: ACM Press, pp. 273-280.
 *
 * This software is distributed under the "New BSD License" agreement:
 *
 * Copyright (c) 2012, Radu-Daniel Vatavu, Lisa Anthony, and 
 * Jacob O. Wobbrock. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the names of the University Stefan cel Mare of Suceava, 
 *	University of Washington, nor UMBC, nor the names of its contributors 
 *	may be used to endorse or promote products derived from this software 
 *	without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Radu-Daniel Vatavu OR Lisa Anthony
 * OR Jacob O. Wobbrock BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, 
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT 
 * OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
**/
//
// Point class
//
function Point(x, y, id) // constructor
{
	this.X = x;
	this.Y = y;
	this.ID = id; // stroke ID to which this point belongs (1,2,...)
}
//
// PointCloud class: a point-cloud template
//
function PointCloud(name, points) // constructor
{
	this.Name = name;
	this.Points = Resample(points, NumPoints);
	this.Points = Scale(this.Points);
	this.Points = TranslateTo(this.Points, Origin);
}
//
// Result class
//
function Result(name, score) // constructor
{
	this.Name = name;
	this.Score = score;
}
//
// PDollarRecognizer class constants
//
var NumPointClouds = 16;
var NumPoints = 32;
var Origin = new Point(0,0,0);
//
// PDollarRecognizer class
//
function PDollarRecognizer() // constructor
{
	//
	// one predefined point-cloud for each gesture
	//
	this.PointClouds[0] = new PointCloud("triangle", new Array(
	new Point(-0.2974635682315081,-0.47362844623075684,1),new Point(-0.20875187669798467,-0.45580376806297057,1),new Point(-0.1288422348754402,-0.41259748645770833,1),new Point(-0.052469821776502,-0.3633616171253704,1),new Point(0.021147206030631693,-0.3094696150610235,1),new Point(0.09734638271950807,-0.2593400004649917,1),new Point(0.17372642271545835,-0.21011101803464832,1),new Point(0.24073004928652342,-0.14951511409397095,1),new Point(0.3213243487901267,-0.10934165475992536,1),new Point(0.4023096411574464,-0.06826758201114902,1),new Point(0.4791943352557194,-0.0250105213753532,1),new Point(0.4239662155899485,0.030199328155017913,1),new Point(0.36056214158422795,0.0955417338493395,1),new Point(0.3029116813750268,0.1657254083330172,1),new Point(0.2327945350380054,0.2236459647678921,1),new Point(0.16211255604794073,0.2807123558551039,1),new Point(0.08637444145424805,0.3312666691832693,1),new Point(0.016784835474422777,0.389142221726952,1),new Point(-0.038575924470552414,0.4605747112094446,1),new Point(-0.09612940949822624,0.5207181189421358,1),new Point(-0.15757195725509193,0.5263715537692432,1),new Point(-0.15757195725509193,0.43508676637842536,1),new Point(-0.16405147803546835,0.34405431426582356,1),new Point(-0.17169158516640654,0.2531161143889856,1),new Point(-0.18704041479250794,0.163298696623975,1),new Point(-0.20296337858342045,0.07352404620886788,1),new Point(-0.21502791567270862,-0.016959981960793125,1),new Point(-0.22519908474388872,-0.1076686727938373,1),new Point(-0.23957738437919796,-0.1975582173936143,1),new Point(-0.25096354578325564,-0.2880199000694059,1),new Point(-0.26369662765099383,-0.37751981018557906,1),new Point(-0.26369662765099383,-0.4688045975763969,1)
	));

	this.PointClouds[1] = new PointCloud("bars", new Array(
	new Point(-0.26101280233463336,-0.4995119844664352,1),new Point(-0.26101280233463336,-0.4346934393489792,1),new Point(-0.26101280233463336,-0.3698748942315232,1),new Point(-0.26101280233463336,-0.3050563491140672,1),new Point(-0.26101280233463336,-0.24023780399661127,1),new Point(-0.26101280233463336,-0.17541925887915533,1),new Point(-0.26101280233463336,-0.11060071376169944,1),new Point(-0.26101280233463336,-0.04578216864424356,1),new Point(-0.26101280233463336,0.019036376473212324,1),new Point(-0.26101832165642214,0.08385446479763159,1),new Point(-0.2725729045863112,0.1476264068214106,1),new Point(-0.2788519980809972,0.21190621648760632,1),new Point(-0.2892411057766106,0.2758639174051841,1),new Point(-0.2954144513090076,0.34023124271314387,1),new Point(-0.3054572467790779,0.40412830409237066,1),new Point(-0.3054572467790779,0.46894684920982654,1),
	new Point(0.2723205309987004,-0.471790161228274,2),new Point(0.2723205309987004,-0.406971616110818,2),new Point(0.2723205309987004,-0.342153070993362,2),new Point(0.2723205309987004,-0.277334525875906,2),new Point(0.2723205309987004,-0.21251598075845013,2),new Point(0.2723205309987004,-0.14769743564099425,2),new Point(0.2723205309987004,-0.08287889052353836,2),new Point(0.2723205309987004,-0.018060345406082423,2),new Point(0.2723205309987004,0.046758199711373516,2),new Point(0.2723205309987004,0.1115767448288294,2),new Point(0.2723205309987004,0.17639528994628528,2),new Point(0.2723205309987004,0.24121383506374117,2),new Point(0.2723205309987004,0.30603238018119705,2),new Point(0.2723205309987004,0.37085092529865304,2),new Point(0.2723205309987004,0.43566947041610893,2),new Point(0.2723205309987004,0.5004880155335648,2)
	));

	this.PointClouds[2] = new PointCloud("bars", new Array(
	new Point(-0.41974602224020047,-0.44320232093554607,1),new Point(-0.4135018031809566,-0.38076013034310646,1),new Point(-0.41273896486796996,-0.3180445524813472,1),new Point(-0.41273896486796996,-0.25529092758491306,1),new Point(-0.41273896486796996,-0.19253730268847874,1),new Point(-0.41273896486796996,-0.12978367779204447,1),new Point(-0.41273896486796996,-0.06703005289561015,1),new Point(-0.41273896486796996,-0.00427642799917588,1),new Point(-0.41273896486796996,0.05847719689725844,1),new Point(-0.41273896486796996,0.12123082179369277,1),new Point(-0.41273896486796996,0.1839844466901271,1),new Point(-0.41273896486796996,0.2467380715865613,1),new Point(-0.41273896486796996,0.3094916964829956,1),new Point(-0.41273896486796996,0.37224532137942995,1),new Point(-0.41273896486796996,0.4349989462758644,1),
	new Point(0.3440232313329224,-0.49724957568443046,2),new Point(0.3440232313329224,-0.43449595078799624,2),new Point(0.3440232313329224,-0.3717423258915621,2),new Point(0.3440232313329224,-0.3089887009951279,2),new Point(0.3440232313329224,-0.24623507609869355,2),new Point(0.34441567785582033,-0.1834917716001882,2),new Point(0.34771393515460053,-0.12082488292336441,2),new Point(0.3510121924533807,-0.05815799424654061,2),new Point(0.3543104497521609,0.0045088944302831835,2),new Point(0.3576087070509411,0.06717578310710698,2),new Point(0.36502435219948254,0.12946922205577865,2),new Point(0.37305501751862274,0.19170687827911598,2),new Point(0.38108568283776306,0.2539445345024533,2),new Point(0.3890225015121788,0.31619411071564346,2),new Point(0.39680613072071885,0.37846314438396317,2),new Point(0.4045897599292588,0.44073217805228265,2),new Point(0.41409380505522725,0.5027504243155696,2)
	));

	this.PointClouds[3] = new PointCloud("angle-right", new Array(
	new Point(-0.4106145534100071,-0.42180940562861025,1),new Point(-0.36107279649986224,-0.40180338432874446,1),new Point(-0.3124989665188446,-0.379540378920778,1),new Point(-0.263925136537827,-0.3572773735128117,1),new Point(-0.21570581793413285,-0.3342608717718025,1),new Point(-0.16758687088849716,-0.3110310352670129,1),new Point(-0.11946792384286148,-0.2878011987622233,1),new Point(-0.07138795910878987,-0.26449078751623567,1),new Point(-0.023308420272039443,-0.24117949595902327,1),new Point(0.02477111856471098,-0.21786820440181104,1),new Point(0.0722769656802929,-0.1934167290017872,1),new Point(0.11964962876968355,-0.16870055695514852,1),new Point(0.16757163923398866,-0.14509215593121788,1),new Point(0.21591858732557379,-0.12234065094694246,1),new Point(0.2637458504764506,-0.0985180925742703,1),new Point(0.3061070206333827,-0.06600538301873116,1),new Point(0.3098818536591992,-0.04594649805210227,1),new Point(0.26536280381663313,-0.016755386511553394,1),new Point(0.22394477885152442,0.016983743412706254,1),new Point(0.18429673949490888,0.05272374591091822,1),new Point(0.14651408230394403,0.09050640310188318,1),new Point(0.11281363994312121,0.13182954644376188,1),new Point(0.08075399220994767,0.17457574342132676,1),new Point(0.05103495618572618,0.21890661167575387,1),new Point(0.023252762923365033,0.2645487863210615,1),new Point(-0.004345406754474812,0.31030062867619146,1),new Point(-0.03126861938989994,0.3564547074797776,1),new Point(-0.058191832025325074,0.4026087862833637,1),new Point(-0.08624146227780854,0.44808253744876103,1),new Point(-0.11533241372245151,0.4928542983709877,1),new Point(-0.14781516896110236,0.5352714561429233,1),new Point(-0.1791330719285256,0.5781905943713898,1)
	));

	this.PointClouds[4] = new PointCloud("angle-left", new Array(
	new Point(0.3435674337971877,-0.4415498226531021,1),new Point(0.28145557301674595,-0.422036338311206,1),new Point(0.22088547627626964,-0.3962251200778178,1),new Point(0.16141881980659323,-0.36790766461606716,1),new Point(0.10163330789335223,-0.3402754435625274,1),new Point(0.04167227354964609,-0.3130204279517519,1),new Point(-0.016848476434370374,-0.2829933087208404,1),new Point(-0.07361953331812243,-0.24959856937745686,1),new Point(-0.13027901022391497,-0.21602448620141726,1),new Point(-0.18532251875605976,-0.17985303773743638,1),new Point(-0.2403660272882047,-0.14368158927345542,1),new Point(-0.29528185430083875,-0.10731723763048806,1),new Point(-0.35008296231189323,-0.07077962261127729,1),new Point(-0.4043582540112206,-0.03346535956798974,1),new Point(-0.46114212801031496,-0.00017348469517136644,1),new Point(-0.42295740952522753,0.008813840933677985,1),new Point(-0.3580217448274717,0.016055795343360824,1),new Point(-0.2942899028296607,0.03268149325583325,1),new Point(-0.23485928986777857,0.06106694442431121,1),new Point(-0.1754404707600093,0.0894846405193312,1),new Point(-0.11602165165224004,0.1179023366143514,1),new Point(-0.05763676315235333,0.1483794221931633,1),new Point(0.0006481289622039532,0.179055681200825,1),new Point(0.05898046460230055,0.20964125267901795,1),new Point(0.11741675197243384,0.24002812211148733,1),new Point(0.17585303934256713,0.2704149915439567,1),new Point(0.23428932671270042,0.3008018609764261,1),new Point(0.29402538122520994,0.3285295868661899,1),new Point(0.3540618701761148,0.355611435659372,1),new Point(0.414464433868761,0.3818734198735659,1),new Point(0.47729784407790754,0.4012528565937468,1),new Point(0.538857871989685,0.4233078321993871,1)
	));

	this.PointClouds[5] = new PointCloud("angles-right", new Array(
	new Point(-0.47063040514558074,-0.5179242507433559,1),new Point(-0.4158740586488048,-0.45549460344211307,1),new Point(-0.36268121240504425,-0.390531616085275,1),new Point(-0.3076534318926866,-0.32711010227495835,1),new Point(-0.2514826298261094,-0.2646980999787616,1),new Point(-0.19461605020890138,-0.20292522145298697,1),new Point(-0.13517277804672578,-0.14375366574153525,1),new Point(-0.09275022081378348,-0.07579799796619685,1),new Point(-0.13896835230112992,-0.007759368821671275,1),new Point(-0.1955038494043525,0.05427196466187212,1),new Point(-0.24860032433711296,0.11928469202486125,1),new Point(-0.3006412558384204,0.1851772577511246,1),new Point(-0.35116965124081057,0.25219337415985743,1),new Point(-0.3977460303167164,0.32205794277371624,1),new Point(-0.4405458937924099,0.3942569569650487,1),new Point(-0.4745874904998623,0.47090553066511087,1),
	new Point(0.06656631345214964,-0.44221216580820616,2),new Point(0.10685194627450417,-0.3687999378380312,2),new Point(0.15445446666074286,-0.29976252800403336,2),new Point(0.20513170028088795,-0.23285930238137625,2),new Point(0.2606859264799823,-0.16989784602240282,2),new Point(0.31811233774801634,-0.10864554276222577,2),new Point(0.37434755259534475,-0.04631728426100501,2),new Point(0.43337961989141166,0.013047720105031524,2),new Point(0.492699334197409,0.0720943794407134,2),new Point(0.5154666153868166,0.1319234291850766,2),new Point(0.4560931489416818,0.19129689563021113,2),new Point(0.3979943640555402,0.2518950757096542,2),new Point(0.34071083786232176,0.3132860472243424,2),new Point(0.2811216728597801,0.37224256603734385,2),new Point(0.21891009257836386,0.42847995199352906,2),new Point(0.15609770545349771,0.4820757492566441,2)
	));

	this.PointClouds[6] = new PointCloud("angles-left", new Array(
	new Point(-0.14945332932855526,-0.2929177765812924,1),new Point(-0.19561955365133998,-0.2404428742840645,1),new Point(-0.24468148980868917,-0.1906150311363563,1),new Point(-0.2976755173557487,-0.14499770336729123,1),new Point(-0.34975202003158345,-0.09833556775693503,1),new Point(-0.404564326844068,-0.05510961077533774,1),new Point(-0.45614400277794354,-0.008692618007758224,1),new Point(-0.4140030716483664,0.025511306117821764,1),new Point(-0.3495228531965262,0.052413431013527356,1),new Point(-0.28522519340570135,0.07958920543906917,1),new Point(-0.22427580381354653,0.11371640122259924,1),new Point(-0.16588171366026538,0.15216372090899716,1),new Point(-0.1115237089586757,0.19595601611744295,1),new Point(-0.059602907442663,0.2427890658455656,1),new Point(-0.012359985854853373,0.2943037885381671,1),
	new Point(0.3019829064790609,-0.2979588032603545,2),new Point(0.2503041052368885,-0.2513871279536709,2),new Point(0.195445082300283,-0.2080329643169757,2),new Point(0.1397529547547669,-0.16584504176860454,2),new Point(0.08191781795905206,-0.12651714874751843,2),new Point(0.02548048389445856,-0.08521507010450488,2),new Point(-0.03126210502778809,-0.04432925881008137,2),new Point(-0.005965610766839102,-0.027620840401211322,2),new Point(0.06205218459817774,-0.013565020626837732,2),new Point(0.1258211438255672,0.014999723303907364,2),new Point(0.18763369623752713,0.04771391016577392,2),new Point(0.2485207529960629,0.08212833355103333,2),new Point(0.30726067644106425,0.12003519672542051,2),new Point(0.36815365747792095,0.15403093407315255,2),new Point(0.4298777001736017,0.18682815049811802,2),new Point(0.4894540339766662,0.2234288387401211,2),new Point(0.5438559972220565,0.2659744356380783,2)
	));

	this.PointClouds[7] = new PointCloud("plus", new Array(
	new Point(-0.00046911921610132135,-0.2946874957419088,1),new Point(-0.00046911921610132135,-0.2390878788061284,1),new Point(-0.00046911921610132135,-0.183488261870348,1),new Point(-0.00046911921610132135,-0.12788864493456764,1),new Point(-0.00046911921610132135,-0.07228902799878731,1),new Point(-0.00046911921610132135,-0.016689411063006976,1),new Point(-0.00046911921610132135,0.038910205872773385,1),new Point(-0.00046911921610132135,0.09450982280855369,1),new Point(-0.00046911921610132135,0.15010943974433405,1),new Point(-0.00046911921610132135,0.2057090566801144,1),new Point(-0.00046911921610132135,0.2613086736158948,1),new Point(-0.00046911921610132135,0.31690829055167513,1),new Point(-0.00046911921610132135,0.37250790748745555,1),
	new Point(-0.49995182914707015,-0.02992110316916019,2),new Point(-0.44435221221128973,-0.02992110316916019,2),new Point(-0.38875259527550937,-0.02992110316916019,2),new Point(-0.333152978339729,-0.02992110316916019,2),new Point(-0.2775533614039486,-0.02992110316916019,2),new Point(-0.2219537444681683,-0.02992110316916019,2),new Point(-0.16635412753238793,-0.02992110316916019,2),new Point(-0.11075451059660762,-0.02992110316916019,2),new Point(-0.055154893660827264,-0.02992110316916019,2),new Point(0.00044472327495315156,-0.02992110316916019,2),new Point(0.056044340210733457,-0.02992110316916019,2),new Point(0.11164395714651376,-0.02992110316916019,2),new Point(0.1672387793004254,-0.02958539995543097,2),new Point(0.22281571639967757,-0.02799748746688091,2),new Point(0.2783926534989297,-0.02640957497833074,2),new Point(0.33382642209058455,-0.022182609139710263,2),new Point(0.38917548575295924,-0.01703152928303986,2),new Point(0.44444855391714955,-0.011786418746369154,2),new Point(0.5000481708529299,-0.011786418746369154,2)
	));

	this.PointClouds[8] = new PointCloud("minus", new Array(
	new Point(-0.49994940217182166,0.007155958977556697,1),new Point(-0.4676827719897168,0.007155958977556697,1),new Point(-0.4354161418076119,0.007155958977556697,1),new Point(-0.40314951162550705,0.007155958977556697,1),new Point(-0.3708828814434022,0.007155958977556697,1),new Point(-0.33861625126129735,0.007155958977556697,1),new Point(-0.3063496210791926,0.007155958977556697,1),new Point(-0.27411421646489087,0.005937361703360468,1),new Point(-0.24188993096006145,0.004284834241574307,1),new Point(-0.20966564545523203,0.0026323067797881447,1),new Point(-0.1774413599504026,0.0009797793180019825,1),new Point(-0.1452170744455732,-0.0006727481437841789,1),new Point(-0.11299278894074377,-0.0023252756055701937,1),new Point(-0.08074874544970906,-0.003206735322961442,1),new Point(-0.048482115267604264,-0.003206735322961442,1),new Point(-0.01621548508549947,-0.003206735322961442,1),new Point(0.01605114509660538,-0.003206735322961442,1),new Point(0.04831777527871012,-0.003206735322961442,1),new Point(0.08058440546081497,-0.003206735322961442,1),new Point(0.1128510356429197,-0.003206735322961442,1),new Point(0.14511766582502456,-0.003206735322961442,1),new Point(0.1773842960071293,-0.003206735322961442,1),new Point(0.20965092618923414,-0.003206735322961442,1),new Point(0.24191755637133888,-0.003206735322961442,1),new Point(0.27418418655344373,-0.003206735322961442,1),new Point(0.3064508167355487,-0.003206735322961442,1),new Point(0.33871744691765365,-0.003206735322961442,1),new Point(0.3709840770997586,-0.003206735322961442,1),new Point(0.40325070728186346,-0.003206735322961442,1),new Point(0.4355173374639684,-0.003206735322961442,1),new Point(0.4677839676460734,-0.003206735322961442,1),new Point(0.5000505978281784,-0.003206735322961442,1)
	));

	this.PointClouds[9] = new PointCloud("circle", new Array(
	new Point(-0.08115033852898135,-0.3697531446769235,1),new Point(-0.1717657116886775,-0.3697531446769235,1),new Point(-0.25817626255108167,-0.34758202240360714,1),new Point(-0.3366927916305115,-0.3036911485187463,1),new Point(-0.4041688102898903,-0.24324122313435512,1),new Point(-0.461048674095928,-0.17326808674135064,1),new Point(-0.4963869936311909,-0.09152802612998934,1),new Point(-0.500364312328108,-0.0011602718766289266,1),new Point(-0.4760843533983381,0.08492031030052022,1),new Point(-0.42455545558523167,0.15877206856736642,1),new Point(-0.36122924940057166,0.2235303898663334,1),new Point(-0.28785756166623755,0.2766885333241412,1),new Point(-0.20486489861245188,0.3126062828306449,1),new Point(-0.1199949939554315,0.34407953257425844,1),new Point(-0.0310998194168301,0.3605299095351387,1),new Point(0.05939394509170981,0.36522166775738624,1),new Point(0.14993395397614473,0.3682381216986224,1),new Point(0.24050153574176825,0.3662297459015747,1),new Point(0.32961497350883373,0.35307505327068295,1),new Point(0.40652511146627757,0.30669677544185364,1),new Point(0.45720798470405377,0.23275810752917675,1),new Point(0.4892046401531941,0.1483163066322481,1),new Point(0.4974288110113335,0.058382217952522464,1),new Point(0.49963568767189204,-0.03209576003551462,1),new Point(0.447686792694705,-0.10549954923916549,1),new Point(0.38452937425959444,-0.17044897773987622,1),new Point(0.32151672179833535,-0.23522401275565566,1),new Point(0.24442267376539506,-0.28267997322298405,1),new Point(0.1571174054585267,-0.3038995493100244,1),new Point(0.06652700637794695,-0.30425096127080997,1),new Point(-0.024088366781749193,-0.30425096127080997,1),new Point(-0.11171802411850096,-0.3217182101791069,1)
	));

	this.PointClouds[10] = new PointCloud("bolt", new Array(
	new Point(-0.4357045412267966,0.25365035690330345,1),new Point(-0.3991713662660196,0.20063946355445733,1),new Point(-0.3611359964510847,0.1483408300589219,1),new Point(-0.3229416953746446,0.0961677774832001,1),new Point(-0.2808568914651527,0.04706883958879304,1),new Point(-0.23998120902233788,-0.0030121971847150153,1),new Point(-0.20055297002217476,-0.05426890788492705,1),new Point(-0.15599179375295652,-0.10074451327920464,1),new Point(-0.11390443241728604,-0.1496312333876886,1),new Point(-0.09285226028718657,-0.13115454372979507,1),new Point(-0.10708127779810162,-0.0681523034901837,1),new Point(-0.124517468575155,-0.005880193572135928,1),new Point(-0.1461245400617312,0.05506968021926395,1),new Point(-0.16698869217338047,0.11623762805591503,1),new Point(-0.18074761559267705,0.1793524344790543,1),new Point(-0.1872359948126538,0.24367976336793934,1),new Point(-0.1497698688655425,0.26016421065631373,1),new Point(-0.09522099794549316,0.22609762690253338,1),new Point(-0.04655403044191231,0.1835140303369001,1),new Point(0.0024710020221568874,0.14134714969440637,1),new Point(0.05189553118011808,0.09964520321737658,1),new Point(0.10138025850487553,0.05801603479854428,1),new Point(0.15161081579827607,0.0172885559120034,1),new Point(0.2018413730916765,-0.02343892297453748,1),new Point(0.2512248829431235,-0.06515130761763666,1),new Point(0.2990110292525284,-0.10872102925268234,1),new Point(0.34679717556193324,-0.15229075088772803,1),new Point(0.39311828231292545,-0.1973946888586407,1),new Point(0.43858659438203795,-0.24337129885723116,1),new Point(0.4828150975070179,-0.2905483688572095,1),new Point(0.5222861412224157,-0.341725237853468,1),new Point(0.5642954587732034,-0.39079408754114103,1)
	));

	this.PointClouds[11] = new PointCloud("arrow-right", new Array(
	new Point(-0.5646255796941281,-0.05069748070450558,1),new Point(-0.496199899508036,-0.05069748070450558,1),new Point(-0.42777421932194387,-0.05069748070450558,1),new Point(-0.35934853913585174,-0.05069748070450558,1),new Point(-0.29092285894975967,-0.05069748070450558,1),new Point(-0.2224971787636676,-0.05069748070450558,1),new Point(-0.15407149857757546,-0.05069748070450558,1),new Point(-0.08564581839148339,-0.05069748070450558,1),new Point(-0.017220138205391256,-0.05069748070450558,1),
	new Point(-0.17730925245862794,-0.38195008078661336,2),new Point(-0.11970430878837768,-0.3450341494751858,2),new Point(-0.06277070144927255,-0.30707841124911567,2),new Point(-0.004361679679722563,-0.2714989513824865,2),new Point(0.05490765821304178,-0.23730510259819942,2),new Point(0.11333445874004433,-0.2017215056908349,2),new Point(0.17106256988492408,-0.16498543496227494,2),new Point(0.22879068102980404,-0.12824936423371514,2),new Point(0.2834356443858683,-0.08713829165295867,2),new Point(0.3379997059639527,-0.04588099022468478,2),new Point(0.3930979393678101,-0.005541493116347218,2),new Point(0.4353744203058719,0.04712573106646739,2),new Point(0.38309080105798954,0.06884511608941019,2),new Point(0.31766201240457637,0.08801934220343982,2),new Point(0.2564602234834714,0.1186202366639923,2),new Point(0.19628866275778467,0.15115703969559507,2),new Point(0.1367198083736244,0.1848263921735988,2),new Point(0.08130030992106141,0.22477887534216395,2),new Point(0.026826458510219253,0.26618643353705046,2),new Point(-0.027914085638654385,0.30724184164870566,2),new Point(-0.08163413722872498,0.3495996844768448,2),new Point(-0.13520939446900987,0.39215638842476025,2),new Point(-0.18914206413981238,0.43410402039094004,2)
	));

	this.PointClouds[12] = new PointCloud("arrow-right", new Array(
	new Point(-0.6040153606765813,0.014692088482739285,1),new Point(-0.5530443971178914,0.014692088482739285,1),new Point(-0.5020734335592014,0.014692088482739285,1),new Point(-0.45110247000051146,0.014692088482739285,1),new Point(-0.40013150644182144,0.014692088482739285,1),new Point(-0.3491605428831314,0.014692088482739285,1),new Point(-0.2981895793244414,0.014692088482739285,1),new Point(-0.24721861576575144,0.014692088482739285,1),new Point(-0.19624765220706142,0.014692088482739285,1),new Point(-0.1452766886483714,0.014692088482739285,1),new Point(-0.09430572508968138,0.014692088482739285,1),new Point(-0.04333476153099136,0.014692088482739285,1),new Point(0.0076362020276986575,0.014692088482739285,1),new Point(0.058607165586388676,0.014692088482739285,1),new Point(0.10957812914507847,0.014692088482739285,1),
	new Point(0.008053604840659978,-0.19488138917139367,2),new Point(0.038937428533354024,-0.16269840137792715,2),new Point(0.08470781474650546,-0.14031903987034655,2),new Point(0.12990243216299002,-0.11684497565719408,2),new Point(0.17753417244609715,-0.09869955078743899,2),new Point(0.22551297100478263,-0.08162909203441421,2),new Point(0.27476289690033084,-0.06849577846226809,2),new Point(0.32493931585766556,-0.05964879876155288,2),new Point(0.37487582292209654,-0.04996308393105381,2),new Point(0.39598463932341865,-0.01649006461923938,2),new Point(0.36132390771830947,0.0185392180358869,2),new Point(0.3221599474494433,0.05114547938864608,2),new Point(0.2820805440557961,0.08263643919794036,2),new Point(0.23923455251359993,0.11015898540549249,2),new Point(0.1968683171678829,0.1384451264756096,2),new Point(0.1555886433130229,0.16832668285921845,2),new Point(0.11581222553031523,0.20003691606894616,2)
	));

	this.PointClouds[13] = new PointCloud("arrow-left", new Array(
	new Point(0.6242212434051411,-0.017456783454363967,1),new Point(0.5565226654465817,-0.017456783454363967,1),new Point(0.4892921963938611,-0.024043575611764123,1),new Point(0.4228097100239343,-0.036744916952001105,1),new Point(0.35574679353153094,-0.04521277560501197,1),new Point(0.288275451003863,-0.05075232009302,1),new Point(0.22077628018820272,-0.05594456400191686,1),new Point(0.15324560791110342,-0.06069802607523031,1),new Point(0.08569697161605416,-0.06520126849490024,1),new Point(0.018048029546883115,-0.06763502202371124,1),new Point(-0.04961948689228102,-0.06968555282489802,1),new Point(-0.11731417690112589,-0.06994221640087409,1),new Point(-0.18501275485968544,-0.06994221640087409,1),new Point(-0.252711332818245,-0.06994221640087409,1),new Point(-0.3204099107768045,-0.06994221640087409,1),
	new Point(-0.1060512889438342,-0.2942915706417187,2),new Point(-0.15134472902147253,-0.24405257198971583,2),new Point(-0.20456557415901575,-0.20270140159794048,2),new Point(-0.2594955589516098,-0.16313624166416596,2),new Point(-0.3152653690252403,-0.12477088951228779,2),new Point(-0.37577875659485893,-0.09542682935576438,2),new Point(-0.3338913920916507,-0.04884849019025972,2),new Point(-0.2843643499606221,-0.0029259819805937948,2),new Point(-0.23227009080023006,0.04030338541969608,2),new Point(-0.1808694985144521,0.0843610359503631,2),new Point(-0.1290722872715675,0.12794940836043217,2),new Point(-0.07706479908532021,0.17128898184897157,2),new Point(-0.026249685115856014,0.21601076621491816,2),new Point(0.024249233821951544,0.26109908669510346,2),new Point(0.07329751223674419,0.30772248148437004,2),new Point(0.12116763578792777,0.3555926050355536,2),new Point(0.16800171087009141,0.40242668011771626,2)
	));

	this.PointClouds[14] = new PointCloud("arrow-up", new Array(
	new Point(-0.03200853238679577,0.6149755799240527,1),new Point(-0.03200853238679577,0.5603095073275162,1),new Point(-0.03200853238679577,0.5056434347309795,1),new Point(-0.03200853238679577,0.45097736213444295,1),new Point(-0.03200853238679577,0.3963112895379064,1),new Point(-0.03200853238679577,0.34164521694136973,1),new Point(-0.03200853238679577,0.2869791443448332,1),new Point(-0.03200853238679577,0.23231307174829663,1),new Point(-0.03200853238679577,0.17764699915175997,1),new Point(-0.03200853238679577,0.12298092655522341,1),new Point(-0.03200853238679577,0.0683148539586868,1),new Point(-0.03200853238679577,0.013648781362150253,1),new Point(-0.03200853238679577,-0.041017291234386355,1),new Point(-0.03200853238679577,-0.09568336383092296,1),new Point(-0.01638353238679577,-0.1448051911032617,1),new Point(-0.011175199053462426,-0.1982417429836535,1),
	new Point(-0.21710672542935294,-0.17007949022133537,2),new Point(-0.18423391169184009,-0.21330724766922168,2),new Point(-0.1536645900036348,-0.2585827581066287,2),new Point(-0.12629633064721768,-0.30582382355510357,2),new Point(-0.09602676977927704,-0.3509108685383032,2),new Point(-0.056787553205988606,-0.3850244200759473,2),new Point(-0.013885315722881125,-0.35738790896850564,2),new Point(0.024285648455796838,-0.318313572566688,2),new Point(0.06063876486312203,-0.2775758715853071,2),new Point(0.0940371616711898,-0.23439297624983702,2),new Point(0.12301012220149105,-0.18803623940135503,2),new Point(0.1528795091772216,-0.14226947115014446,2),new Point(0.18399598320263216,-0.0973234531134401,2),new Point(0.20736654354648898,-0.04798258635605401,2),new Point(0.22822418060444566,0.0025365290688229014,2),new Point(0.24924146761320426,0.05247557992405272,2)
	));

	this.PointClouds[15] = new PointCloud("arrow-down", new Array(
	new Point(-0.025648798834685044,-0.6000783022969381,1),new Point(-0.025648798834685044,-0.537338705381426,1),new Point(-0.025648798834685044,-0.4745991084659139,1),new Point(-0.025648798834685044,-0.41185951155040174,1),new Point(-0.025648798834685044,-0.3491199146348896,1),new Point(-0.025648798834685044,-0.28638031771937744,1),new Point(-0.025648798834685044,-0.22364072080386532,1),new Point(-0.025648798834685044,-0.1609011238883532,1),new Point(-0.025648798834685044,-0.09816152697284108,1),new Point(-0.025648798834685044,-0.035421930057328965,1),new Point(-0.025648798834685044,0.027317666858183265,1),new Point(-0.025648798834685044,0.09005726377369538,1),new Point(-0.025648798834685044,0.1527968606892075,1),new Point(-0.025648798834685044,0.2155364576047195,1),
	new Point(-0.2058548601491869,-0.014739989308713008,2),new Point(-0.17682048165789152,0.04085641531763784,2),new Point(-0.14594900771519465,0.095475176908563,2),new Point(-0.1148115466807882,0.14994204511242115,2),new Point(-0.08345916137922135,0.20428617963513707,2),new Point(-0.052064333586198275,0.258605785165939,2),new Point(-0.02063694009296113,0.3129065494189023,2),new Point(0.011503315962710231,0.3667742831197489,2),new Point(0.043079503664864766,0.39992169770306185,2),new Point(0.059895716750129335,0.3397031280363343,2),new Point(0.07219996401732709,0.27818189170034546,2),new Point(0.08738905444067036,0.2173488276973301,2),new Point(0.10250105927107761,0.15649737511321749,2),new Point(0.11480530653827536,0.09497613877722877,2),new Point(0.13199001120440973,0.03463816541600817,2),new Point(0.15070366404373625,-0.025245523669836456,2),new Point(0.17595317753289835,-0.08261187461472352,2),new Point(0.20865874152093472,-0.1357233586830735,2)
	));


	//
	// The $P Point-Cloud Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), DeleteUserGestures()
	//
	this.Recognize = function(points)
	{
		points = Resample(points, NumPoints);
		points = Scale(points);
		points = TranslateTo(points, Origin);
		
		var b = +Infinity;
		var u = -1;
		for (var i = 0; i < this.PointClouds.length; i++) // for each point-cloud template
		{
			var d = GreedyCloudMatch(points, this.PointClouds[i]);
			if (d < b) {
				b = d; // best (least) distance
				u = i; // point-cloud
			}
		}
		return (u == -1) ? new Result("No match.", 0.0) : new Result(this.PointClouds[u].Name, Math.max((b - 2.0) / -2.0, 0.0));
	};
	this.AddGesture = function(name, points)
	{
		this.PointClouds[this.PointClouds.length] = new PointCloud(name, points);
		var num = 0;
		for (var i = 0; i < this.PointClouds.length; i++) {
			if (this.PointClouds[i].Name == name)
				num++;
		}
		return num;
	}
	this.DeleteUserGestures = function()
	{
		this.PointClouds.length = NumPointClouds; // clear any beyond the original set
		return NumPointClouds;
	}
}
//
// Private helper functions from this point down
//
function GreedyCloudMatch(points, P)
{
	var e = 0.50;
	var step = Math.floor(Math.pow(points.length, 1 - e));
	var min = +Infinity;
	for (var i = 0; i < points.length; i += step) {
		var d1 = CloudDistance(points, P.Points, i);
		var d2 = CloudDistance(P.Points, points, i);
		min = Math.min(min, Math.min(d1, d2)); // min3
	}
	return min;
}
function CloudDistance(pts1, pts2, start)
{
	var matched = new Array(pts1.length); // pts1.length == pts2.length
	for (var k = 0; k < pts1.length; k++)
		matched[k] = false;
	var sum = 0;
	var i = start;
	do
	{
		var index = -1;
		var min = +Infinity;
		for (var j = 0; j < matched.length; j++)
		{
			if (!matched[j]) {
				var d = Distance(pts1[i], pts2[j]);
				if (d < min) {
					min = d;
					index = j;
				}
			}
		}
		matched[index] = true;
		var weight = 1 - ((i - start + pts1.length) % pts1.length) / pts1.length;
		sum += weight * min;
		i = (i + 1) % pts1.length;
	} while (i != start);
	return sum;
}
function Resample(points, n)
{
	var I = PathLength(points) / (n - 1); // interval length
	var D = 0.0;
	var newpoints = new Array(points[0]);
	for (var i = 1; i < points.length; i++)
	{
		if (points[i].ID == points[i-1].ID)
		{
			var d = Distance(points[i - 1], points[i]);
			if ((D + d) >= I)
			{
				var qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
				var qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
				var q = new Point(qx, qy, points[i].ID);
				newpoints[newpoints.length] = q; // append new point 'q'
				points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
				D = 0.0;
			}
			else D += d;
		}
	}
	if (newpoints.length == n - 1) // sometimes we fall a rounding-error short of adding the last point, so add it if so
		newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y, points[points.length - 1].ID);
	return newpoints;
}
function Scale(points)
{
	var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
	for (var i = 0; i < points.length; i++) {
		minX = Math.min(minX, points[i].X);
		minY = Math.min(minY, points[i].Y);
		maxX = Math.max(maxX, points[i].X);
		maxY = Math.max(maxY, points[i].Y);
	}
	var size = Math.max(maxX - minX, maxY - minY);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = (points[i].X - minX) / size;
		var qy = (points[i].Y - minY) / size;
		newpoints[newpoints.length] = new Point(qx, qy, points[i].ID);
	}
	return newpoints;
}
function TranslateTo(points, pt) // translates points' centroid
{
	var c = Centroid(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++) {
		var qx = points[i].X + pt.X - c.X;
		var qy = points[i].Y + pt.Y - c.Y;
		newpoints[newpoints.length] = new Point(qx, qy, points[i].ID);
	}
	return newpoints;
}
function Centroid(points)
{
	var x = 0.0, y = 0.0;
	for (var i = 0; i < points.length; i++) {
		x += points[i].X;
		y += points[i].Y;
	}
	x /= points.length;
	y /= points.length;
	return new Point(x, y, 0);
}
function PathDistance(pts1, pts2) // average distance between corresponding points in two paths
{
	var d = 0.0;
	for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
		d += Distance(pts1[i], pts2[i]);
	return d / pts1.length;
}
function PathLength(points) // length traversed by a point path
{
	var d = 0.0;
	for (var i = 1; i < points.length; i++)
	{
		if (points[i].ID == points[i-1].ID)
			d += Distance(points[i - 1], points[i]);
	}
	return d;
}
function Distance(p1, p2) // Euclidean distance between two points
{
	var dx = p2.X - p1.X;
	var dy = p2.Y - p1.Y;
	return Math.sqrt(dx * dx + dy * dy);
}