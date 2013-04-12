// $Header: pubjs.js 2002-6-26 0:47 Marco Liu (Protime) v0.1 
// Modified by: {-BiLL-} 2002-8-26 17:18 v3.0
// 20090713 lk add begin 
//У������ʱ�� �磺2001-01-01 20:15:20
function isDateTime(str)   
{   
   var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;   
   var r = str.match(reg);   
   if(r==null)return false;   
   var d= new Date(r[1], r[3]-1,r[4],r[5],r[6],r[7]);   
   return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]&&d.getHours()==r[5]&&d.getMinutes()==r[6]&&d.getSeconds()==r[7]);   
} 

function isWhiteSpace(c)
{
	return (c == ' ');
}

function isDigit(c)
{
	return ((c >= '0') && (c <= '9'));
}

function trim(str)
{
  if(str == null)
  {
    return str;
  }

  var strLen = str.length;
  if(strLen ==  0)
  {
    return str;
  }

  var startIndex = -1;
  var endIndex;
  var newStr;

  for(var i = 0; i < strLen; i++) 
  {
    if(!isWhiteSpace(str.charAt(i))) 
    {
      startIndex = i;
      break;
    }
  }

  if(startIndex == -1)
  {
    return "";
  }

  for(var i = strLen - 1; i >= startIndex; i--) 
  {
    if(!isWhiteSpace(str.charAt(i))) 
    {
      endIndex = i;
      break;
    }
  }

  newStr = str.substring(startIndex, endIndex + 1);

  return newStr;
}

function isEmpty(str)
{
  if(str == null)
  {
    return true;
  }

  var strLen = str.length;
  if(strLen == 0)
  {
    return true;
  }

  for(var i = 0; i < strLen; i++) 
  {
    if(!isWhiteSpace(str.charAt(i)))
    {
      return false;
    }
  }

  return true;
}

function isInteger(str,length)
{
	if(str.length<=0||str.length>length){
		return false;
	}
	for (var i=0; i<str.length; i++)
	{
		if(!isDigit(str.charAt(i))){
			return false;
		}
	}
	return true;
}


function isPositiveInteger(str)
{
  var newStr = trim(str);

  if(isEmpty(newStr))
  {
    return false;
  }

  var strLen = newStr.length;
  var startIndex = 0;
  if(newStr.charAt(0) == '+') 
  {
    for(startIndex = 1; startIndex < strLen; startIndex++)
    {
      if(!isWhiteSpace(newStr.charAt(startIndex)))
      {
        break;
      }
    }

    if(startIndex >= strLen)
    {
      return false;
    }
  }

  for(var i = startIndex; i < strLen; i++) 
  {
    if (! isDigit(newStr.charAt(i)))
    {
      return false;
    }
  }

  return true;
}

function isEmail(str)
{
	if(isEmpty(str))
	{
		return false;
	}
	var strlen=str.length;
	var counterAt=0;
	var posAt=-1;
	var counterDot=0;
	var posDot=-1;
	var posLastDot=-1;
	if(strlen<=6){
		return false;
	}
	for(var i = 0 ; i < strlen ; i++){
		if(str.charAt(i)=='@'){
			counterAt+=1;
			if(counterAt==1){
				posAt=i;
			}
		}
		if(str.charAt(i)=='.'){
			counterDot+=1;
			if(counterDot==1){
				posDot=i;
			}
			posLastDot=i;
		}
	}
	if(counterAt==1&&counterDot>=1&&posAt>=2&&posLastDot<strlen-2){
		return true;
	}
	return false;

}

function isID(str)
{
	if(str.length!=15&&str.length!=18){
		return false;
	}
	if(str.length==15){
		for(var i = 0 ; i < str.length ; i++){
			if(!isDigit(str.charAt(i))){
				return false;
			}
		}
	}
	if(str.length==18){
		for(var i = 0 ; i < str.length-1 ; i++){
			if(!isDigit(str.charAt(i))){
				return false;
			}
		}
	}
	return true;
}

function isNumNew(str,p1,p2){
	var newStr=trim(str);
	var intAllowed=p1-p2;
	if(newStr.charAt(0)=='+'||newStr.charAt(0)=='-'){
		newStr=newStr.substr(1);
	}
	if(intAllowed<0){
		alert("Function calling parameter error!");
		return false;
	}
	var tempArray=newStr.split(".");
	if(tempArray==newStr){
		if(tempArray[0].length>intAllowed){
			return false;
		} else {
			for(var i=0;i<tempArray[0].length;i++){
				if(!isDigit(tempArray[0].charAt(i))){
					return false;
				}
			}
		}
	} else {
		if (p2==0)
		{
			return false;	
		}	
		if(tempArray.length!=2){
			return false;
		}
		if (tempArray[1].length>p2){
			return false;
		}
		if(tempArray[0].length+tempArray[1].length>p1){
			return false;
		}
		if(tempArray[0].length>intAllowed){
			return false;
		} else {
			for(var i=0;i<tempArray[0].length;i++){
				if(!isDigit(tempArray[0].charAt(i))){
					return false;
				}
			}
			for(var i=0;i<tempArray[1].length;i++){
				if(!isDigit(tempArray[1].charAt(i))){
					return false;
				}
			}
		}
	}
	return true;
}

function isPercent(str)
{
	if(!isNumber(str)){
		return false;
	}
	var tempArray=str.split(".");
	//if (parseInt(tempArray[0],10)==100 &&0 (tempArray[1]=="00"||tempArray[1]=="0"))
	if (parseFloat(str) ==100.00)
	{
			return true;//100.00 is permit here��Add By Comman
	}
	if(tempArray==str){
		if(parseInt(tempArray,10)>100||parseInt(tempArray,10)<0){
			return false;
		}
	} else {
		if(tempArray.length!=2){
			return false;
		} else {
			if(tempArray[0].length!=1&&tempArray[0].length!=2){
				return false;
			}
			if(tempArray[1].length!=1&&tempArray[1].length!=2){
				return false;
			}
			if(parseInt(tempArray[0],10)>100&&parseInt(tempArray[0],10)<0){
				return false;
			}
			if(parseInt(tempArray[1],10)>100&&parseInt(tempArray[1],10)<0){
				return false;
			}
		}
	}
	return true;
}

function isDate(str)
{
	if(isEmpty(str))
	{
		return false;
	}
	var dateArray;
	dateArray=str.split("-");
	if(dateArray==str){
//		dateArray=str.split(".");
//		if(dateArray==str){
//			dateArray=str.split("/");
//			if(dateArray==str){
				return false;
//			}
//		}
	}
	if(dateArray.length!=3){
		return false;
	}
	if(!isNumber(dateArray[0])||!isNumber(dateArray[1])||!isNumber(dateArray[2])){
		return false;
	}
	if(dateArray[0].indexOf('.')>=0||dateArray[1].indexOf('.')>=0||dateArray[2].indexOf('.')>=0){
		return false;
	}
	if(parseInt(dateArray[0],10)<=2099&&parseInt(dateArray[0],10)>=1900&&parseInt(dateArray[1],10)>=1&&parseInt(dateArray[1],10)<=12&&parseInt(dateArray[2],10)>=1&&parseInt(dateArray[2],10)<=31)
	{
		if(parseInt(dateArray[0],10)%100==0&&parseInt(dateArray[0],10)%400!=0){
			if(parseInt(dateArray[1],10)==2){
				if(parseInt(dateArray[2],10)>28){
					return false;
				}
			}
		} else {
			if(parseInt(dateArray[0],10)%4==0){
				if(parseInt(dateArray[1],10)==2){
					if(parseInt(dateArray[2],10)>29){
						return false;
					}
				}
			}
		}
		var mon=parseInt(dateArray[1],10);
		if(mon==4||mon==6||mon==9||mon==11){
			if(parseInt(dateArray[2],10)>30){
				return false;
			}
		}
		if(parseInt(dateArray[0],10)%4!=0&&mon==2){
			if(parseInt(dateArray[2],10)>28){
				return false;
			}
		}

		return true;
	}
	return false;
}

function isTime(str) //Len
{
	if (isEmpty(str))
	{
		return false;
	}
	var timeArray;
	timeArray=str.split(":");
	if(timeArray.length!=3) return false;
    if(timeArray[0].indexOf('.')>=0||timeArray[1].indexOf('.')>=0||timeArray[2].indexOf('.')>=0) return false;
    if(timeArray[0].indexOf('-')>=0||timeArray[1].indexOf('-')>=0||timeArray[2].indexOf('-')>=0) return false;
    if(timeArray[0].indexOf('+')>=0||timeArray[1].indexOf('+')>=0||timeArray[2].indexOf('+')>=0) return false;
	if(!isNumber(timeArray[0])||!isNumber(timeArray[1])||!isNumber(timeArray[2])) return false;
	if(parseInt(timeArray[0])>24||parseInt(timeArray[1])>60||parseInt(timeArray[2])>60) return false;
	if(timeArray[0].length>2||timeArray[1].length>2||timeArray[2].length>2) return false;

	return true;
}

function isNumber(str)
{
  var newStr = trim(str);

  if(isEmpty(newStr))
  {
    return false;
  }

  var strLen = newStr.length;
  var startIndex = 0;
  var dot=0;
  for(startIndex=0;startIndex<strLen;startIndex++) {
	  if(!isDigit(newStr.charAt(startIndex))){
		  if(startIndex==0){
			  if(newStr.charAt(startIndex)!='-'){
				  if(startIndex==0&&(newStr.charAt(startIndex)!='.')){
					  return false;
				  } else {
					  dot+=1;
				  }
			  } else {
				  if(strLen<=1){
					  return false;
				  }
			  }
		  } else {
			  if(dot==0&&(newStr.charAt(startIndex)=='.')){
				  dot+=1;
			  } else {
				  return false;
			  }
		  }
	  }
  }
  return true;
}

function isChar(str)
{
  var newStr = trim(str);

  if(isEmpty(newStr))
  {
    return false;
  }

  var strLen = newStr.length;
  var startIndex = 0;
  var dot=0;
  var characters = "";
  for(startIndex=0;startIndex<strLen;startIndex++) {
	  characters = newStr.charAt(startIndex);
	  if(!(("a"<=characters && characters <= "z") || ("A"<=characters && characters <= "Z")))
	  {
		 return false;
	  }
  }
  return true;
}

function checkLength(string,length)
{
	var strlen=string.length;
	if(strlen==0){
		return true;
	}
	if(strlen){
		if(strlen<=length){
			return true;
		}
	}
	return false;
}

function checkLength2(string,length)
{
	var strlen=string.length;
	if(strlen==0){
		return true;
	}
	if(strlen){
		if(strlen==length){
			return true;
		}
	}
	return false;
}
//�������6λ�ķ���
function checkLength3(string,length)
{
	var strlen=string.length;
	if(strlen==0){
		return true;
	}
	if(string!='����'){
	   if(strlen){
		if(strlen==length){
			return true;
		}
	 }
	
	}else{
          
      return true;
	}
	return false;
}

function isRadioChecked(frm, rdo)
{
	for (var i = 0; i < frm.elements.length; i++)
	{
		if (frm.elements[i].type == 'radio' && frm.elements[i].name == rdo && frm.elements[i].checked)
			return true;
	}
	return false;
}

function isCheckboxChecked(frm, cb)
{
	for (var i = 0; i < frm.elements.length; i++)
	{
		if (frm.elements[i].type == 'checkbox' && frm.elements[i].name == cb && frm.elements[i].checked)
			return true;
	}
	return false;
}

function isComboSelected(cmb, defaultval)
{
	if (typeof(cmb) == 'undefined' || cmb.value == defaultval)
		return false;
	else
		return true;
}

function hyFileReview(url)
{
	var nwin;
	if (isEmpty(url))
		alert('��û��ѡ���ļ�');
	else
	{

		nwin = window.open(url, 'FileReview', 'width=600,height=400,top=50,left=100,resizable=yes,scrollbars=yes');
		nwin.focus();
	}
}


function isDateAOldB(date_a,date_b)
{
	if (isDate(date_a) && isDate(date_b))
	{
		arr_a = date_a.split("-");
		arr_b = date_b.split("-");
		//������da,db����ʵ�ʵĴ�һ����,��: �ַ���"2002-9-19" ʵ�ʴ���Date������2002-10-19
		da=new Date(arr_a[0],arr_a[1],arr_a[2]);
		db=new Date(arr_b[0],arr_b[1],arr_b[2]);
		//alert(da+"<br>"+db);
		//alert("da>db:"+da>db);
		//return (da>db);
		var day=arr_a[0];
		var dam=arr_a[1];
		var dad=arr_a[2];
		var dby=arr_b[0];
		var dbm=arr_b[1];
		var dbd=arr_b[2];
		if (dam.length<2)
		{
			dam="0"+dam;
		}
		if (dad.length<2)
		{
			dad="0"+dad;
		}
		if (dbm.length<2)
		{
			dbm="0"+dbm;
		}
		if (dbd.length<2)
		{
			dbd="0"+dbd;
		}
		return (parseInt(day+dam+dad)>parseInt(dby+dbm+dbd));
	}
	else
		return false;
}

//�ж�ʱ���Ƿ��ڵ�ǰʱ��֮ǰ
function isCurrentDate(str)
{
	if (!isDate(str))
		return false;

	var d_now = new Date();
	str_now = d_now.getYear() + "-"+(d_now.getMonth()+1)+"-"+d_now.getDate();
	if (isDateAOldB(str,str_now))
		return false;
	else
		return true;
}

// ********************* ֱ��ʹ�� 2002.9.19 W.Q.Ding
//�ж�ʱ���Ƿ��ڵ�ǰʱ��֮ǰ,�ҽ����ղ�Ϊ������,������
function isTransactionDate(str)
{
	if (!isDate(str))
	{
		alert("��ѯʱ�䲻��ȷ");	
		return false;
	}
	if (!isCurrentDate(str))
	{
		alert("��ѯʱ�䲻�ܳ�����ǰʱ��");	
		return false;
	}
	
	arr = str.split("-");
	str_date = new Date(arr_a[0],(arr_a[1]-1),arr_a[2]);	// �ַ���str="2002-9-19" ������Date����ʱ,���·ݼ�1(��Ϊ�·ݴ�0��ʼ),��: new Date(2002,9-1,19)
	if (str_date.getDay()==0 || str_date.getDay() == 6)
	{
		alert("��ѯʱ�䲻�ǽ�����");	
		return false;
	}
	else
		return true;
}

//�ж�����ʱ���Ƿ���ȷ:1.Ϊ���ڸ�ʽ 2.��ʼʱ��С�ڽ���ʱ��
function isCorrect2Date(str1,str2)
{
	if (!isDate(str1))
	{
		alert("��ʼʱ�䲻��ȷ");	
		return false;
	}
	if (!isDate(str2))
	{
		alert("����ʱ�䲻��ȷ");	
		return false;
	}
	if (!isCurrentDate(str1))
	{
		alert("��ʼʱ�䲻�ܳ�����ǰʱ��");
		return false;
	}

	if (!isCurrentDate(str2))
	{
		alert("����ʱ�䲻�ܳ�����ǰʱ��");
		return false;
	}
	
	if (isDateAOldB(str1,str2))
	{
		alert("��ʼʱ�䲻�ܳ�������ʱ��");
		return false;
	}
	else
		return true;
}

// ���������������ϲ�
function isChkDateAll(d1,d2)
{
	if (d2== "")
	{
		if (!isTransactionDate(d1))
			return false;
	}
	else
	{
		if (!isCorrect2Date(d1,d2))
			return false;
	}
	return true;
}

//�ж��Ƿ�IP��ַ
function isIP(str)
{
	if(isEmpty(str))
	{
		return false;
	}
	var sectArray;
	sectArray = str.split(".");
	if (sectArray.length != 4)
	{
		return false;
	}
	for (var i = 0; i < 4; i++)
	{						 
		if (!isNumber(sectArray[i]) || sectArray[i] < 0 || sectArray[i] >255)
		{
			return false;
		}
	}

	return true;
}