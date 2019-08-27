function generateGreetingScript(fullName, gender, isPartyList, partyName, province) {
  const partyListTypeText = 'แบบบัญชีรายชื่อ';
  const districtTypeText = ''; //PUT YOUR CODE HERE
  const electiveTypeText = isPartyList ? partyListTypeText : districtTypeText;
  const title = gender === 'male' ? 'กระผม' : 'ดิฉัน';

  const greetingMessage = ''; // PUT YOUR CODE HERE
  console.log(greetingMessage);
}

generateGreetingScript('นายจาวาสคริปต์ อีเอสหก', 'male', true, 'สคูลดิโอ');
/*
กราบเรียนท่านประธานสภาที่เคารพ
	กระผม "นายจาวาสคริปต์ อีเอสหก"
		สมาชิกสภาผู้แทนราษฎรแบบบัญชีรายชื่อ 
		พรรคสคูลดิโอ 
ในฐานะสมาชิกรัฐสภา
*/

generateGreetingScript('นางสาวเจเอส อีเอสเจ็ด', 'female', false, 'เพื่อเธอ', 'กรุงเทพมหานคร');
/*
กราบเรียนท่านประธานสภาที่เคารพ
		ดิฉัน "นางสาวเจเอส อีเอสเจ็ด"
		สมาชิกสภาผู้แทนราษฎรจังหวัดกรุงเทพมหานคร
		พรรคสคูลดิโอ 
ในฐานะสมาชิกรัฐสภา
*/
