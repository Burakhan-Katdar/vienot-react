import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Root = styled('div')(({ theme }) => ({
	'& .KnowledgeBasePage-header': {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

const Transition = forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

const knowledgeBaseDB = [
	{
		id: '1',
		title: 'FIRST_MAIN_TITLE',
		path: 'pages/knowledge-base',
		articlesCount: 17,
		featuredArticles: [
			{
				id: '1',
				title: 'Temel Bilgiler',
				title_en: 'Basic Information',
				content:
					"<p>Etkinlik yönetimi sayfasına gidin.</p> <p>Yeni etkinlik ekle butonuna basın.</p> <p><strong>Temel Bilgiler</strong></p> <p>Etkinliğiniz için bir başlık belirtin.</p> <p>Etkinliğiniz için detaylı bir açıklama belirtin.</p> <p><em>Açıklama içerisine dış bağlantılar içeren linkler yerleştirebilirsiniz.</em></p> <p><strong>Görseller</strong></p> <p>-Etkinliğiniz için toplamda 3 adet görsel yükleyebilirsiniz.<br /> -Maksimum 1 MB boyutunda, png, jpg, jpeg türlerinde dosya yükleyebilirsiniz.<br /> -Herhangi bir resim yüklemezseniz, varsayılan resim kullanılacaktır.</p>",
				content_en:
					"<p>Go to the event management page.</p> <p>Press the add new event button.</p> <p><strong>Basic Information</strong></p> <p>Specify a title for your event.</p> <p>Provide a detailed description for your action.</p> <p><em>In the description, you can include links to external websites.</em></p> <p><strong>Images</strong></p> <p>-You can upload a total of 3 images for your event.<br /> -You can upload files in the following formats: png, jpg, and jpeg, with a maximum size of 1 MB.<br /> -If no photos are uploaded, the default image will be used.<br />  </p>"
			},
			{
				id: '2',
				title: 'Etkinlik Şartları',
				title_en: 'Conditions',
				content:
					"<p><strong>Etkinlik Tweetini daha önce paylaşmadım, canlı olarak yayınlayacağım.</strong></p> <p>Daha önce gönderilmiş bir tweet üzerinden şartlar oluşturacaksanız, bu seçenek deaktif olmalıdır.</p> <p><strong>Birincil Tweet Linki:</strong> Şartlarınızın otomatik olarak bağlanacağı tweet adresini buraya yerleştirin.</p> <p>Şartlarınızı birden fazla tweete bağlamak istiyorsanız, şartınızı seçtikten sonra açılan kutucuğa birincil tweet linkinden farklı bir tweet adresi yazın.</p> <p>Oluşturacağınız etkinlikle beraber eş zamanlı olarak tweet göndermek ve şartlarınızı henüz oluşmamış bu tweete bağlamak istiyorsanız,<em> 'Etkinlik Tweetini daha önce paylaşmadım, canlı olarak yayınlayacağım.'</em> kutucuğunu işaretleyin.</p> <p>Bu durumda 'Birincil Tweet Linki', etkinliği yayınlacağınız zamanda göndereceğiniz tweet linki olacaktır. Şartlarınızı henüz oluşmamış bu tweete bağlamak için, seçtiğiniz şartların yanında açılan kutucukları boş bırakın.</p> <p><strong>Retweet:</strong> Katılımcıların, belirttiğiniz tweeti Retweet yapmasını sağlar.<br /> <strong>Beğen:</strong> Katılımcıların, belirttiğiniz tweeti beğenmesini sağlar.<br /> <strong>Takip Et:</strong> Katılımcıların, belirttiğiniz kişiyi takip etmesini sağlar.<br /> <strong>Arkadaşını etiketleyerek Yorum Yaz:</strong> Katılımcıların, belirttiğiniz tweete arkadaşlarını etiketleyerek yorum yazmasını sağlar. X adet arkadaşını etiketle gibi bir sayı şartı henüz tamınlanmamıştır. İlerleyen sürümlerde bu özelliği ekleyebiliriz.<br /> <strong>Etiketli Tweet Gönder: </strong>Katılımcıların, belirttiğiniz hashtag ile tweet göndermesini sağlar. Yarışma yapmak için ideal bir şarttır.<br /> <strong>Fotoğraflı Tweet Gönder: </strong>Katılımcıların, belirttiğiniz hashtag ile fotoğraflı bir tweet göndermesini sağlar. Yarışma yapmak için ideal bir şarttır.<br /> <strong>Tweet'e Fotoğraflı Yorum Yaz:</strong> Katılımcıların, belirttiğiniz tweete fotoğraf göndererek yorum yazmasını sağlar.</p> <p><em>Tek bir etkinlikle 6 şart belirtmek yerine, 2 etkinlik içerisine 3 şart eklemek topluluğunuz için daha iyi olacaktır. Bir etkinlik oluştururken, lütfen bu dengeyi göz önünde bulundurun.</em></p>",
				content_en:
					"<p><strong>Event tweet wasn't published yet. Publish live with the event.</strong></p> <p>If you are going to create terms on a previously sent tweet, this option must be disabled.</p> <p><strong>Primary Tweet Link:</strong> Put here the tweet address that your terms will automatically link to.</p> <p>If you want to link your terms to more than one tweet, in the box that appears after selecting your term, insert a separate tweet address from the primary tweet link.</p> <p>If you want to tweet at the same time as the event, make a new tweet and connect your terms to it, such as, mark the box 'Event tweet wasn't published yet. Publish live with the event.'</p> <p>The 'Primary Tweet Link' in this scenario will be the tweet link you send when you post the activity. Leave the boxes that pop up next to the terms you selected blank to relate your terms to this tweet that hasn't been created yet.</p> <p><strong>Retweet:</strong> Allows participants to Retweet the tweet you specify.<br /> <strong>Like:</strong> Allows participants to like the tweet you specify.<br /> <strong>Follow:</strong> Allows participants to follow the person you specify.<br /> <strong>Comment by tagging a friend: </strong>Allows participants to tag their friends in their comments on the tweet you designate. There hasn't been a numerical requirement stated yet, such as tag x friends. In future versions, we may include this feature.<br /> <strong>Post Tagged Tweet</strong>: Allows participants to tweet with the hashtag you specify. It is an ideal condition for running a competition.<br /> <strong>Send Photo Tweet: </strong>Allows participants to send a photo tweet with the hashtag you specify. It is an ideal condition for running a competition.<br /> <strong>Comment on Tweet with a Photo:</strong> Allows participants to comment on the tweet you specify by posting a photo.</p> <p><em>It will be better for your community to add 3 conditions in 2 actions instead of specifying 6 conditions in one action. When creating an action, please consider this balance.</em></p>"
			},
			{
				id: '3',
				title: 'Sonuçlandırma',
				title_en: 'Finalization',
				content:
					"<p><strong>Sonuçlandırma</strong></p> <p>-Etkinliği kaç kişinin kazanacağını belirtin.<br /> -Etkinliğin yedek kazanan sayısı belirtin.</p> <p><em>Yedek kazanan sayısı, asıl kazanan sayısına eşit ya da daha yüksek olmak zorundadır.</em></p> <p><strong>Başlangıç Tarihi</strong></p> <p>Etkinliğin başlayacağı tarihi ve saati belirtin. Buradaki değer, listelenme tarihinden sonra olursa, katılımcılar uygulama içerisinde etkinliğinizi görür ama başvuru yapamaz. Geri sayım tamamlandığında, otomatik olarak başvurular açılır.</p> <p><strong>Bitiş Tarihi</strong></p> <p>Etkinliğin biteceği tarihi ve saati belirtin. Buradaki değere ulaşıldığında katılımcılarınız etkinliğinizi uygulama içerisinde görmeye devam eder. Yeni başvurular alınmaz ve siz etkinliğinizi sonuçlandırana kadar bekler. Berlittiğiniz bitiş tarihinden sonra etkinliğinizi sonuçlandırmak için</p> <p>'Çekiliş' ise 48 saat<br /> 'Yarışma' ise 168 saat (1 hafta)</p> <p>süreniz olacak. Bu sürelerde etkinliğinizi sonuçlandırmamanız halinde, partnerlik sözleşmeniz fesh edilebilir. Daha fazla zamana ihtiyacınız olması halinde bitiş tarihinden önce partner danışmanları ile iletişime geçin.</p> <p><strong>Sonuçlar Nasıl Belirlensin?</strong></p> <p><em><strong>Rastgele Belirlensin - Çekiliş</strong></em></p> <p>Oluşturduğunuz etkinliğin tüm şartlarını yerine getirenler arasından, sistem otomatik olarak kazananları ve yedek kazananları belirler.</p> <p><em><strong>Ben Seçeceğim - Yarışma</strong></em></p> <p>Oluşturduğuz etkinliğin içerisinde bir tane 'hashtag' şartı olmak zorundadır. Katılımcıların gönderdiği hashtag içeren tweetlerin tamamı incelemenize sunulur. Bu kişiler arasından kazanan ve yedek kazanan belirlemeniz gerekir.</p> <p><em>Daha detaylı bilgi için Kazananı Belirle başlığına göz atın.</em></p> <p>Kaydet butonuna basarak etkinliğinizi incelemeye gönderin. Oluşturduğunuz etkinlik, Etkinlik Yönetimi sayfasında 'İnceleme Bekliyor' durumunda listelenmeye başlar.</p>",
				content_en:
					"<p>- Indicate the number of persons who will benefit from your event.<br /> - Indicate how many alternate winners your event will have.</p> <p><em>The number of alternate winners must match or exceed the number of original winners.</em></p> <p><strong>Starting Date</strong></p> <p>Set a start date and time for your event. Participants will see your event in the app but will be unable to apply if the value here is after the listed date. Applications will open immediately once the countdown is complete.</p> <p><strong>End Date</strong></p> <p>Set a date and time for your event to end. Your participants will continue to see your event in the app once this figure is reached. New applications will not be accepted until you have completed the event. After you've set a deadline, you'll need to complete your event.</p> <p>If it is a 'Raffle' you will have 48 hours</p> <p>If it is a 'Competition' you will have 168 hours(1 week)</p> <p>Your partnership agreement may be canceled if you do not complete your event within certain time frames. Contact the partner advisors before the deadline if you require additional time.</p> <p><strong>Choose a Way to Pick Winners</strong></p> <p><strong>Pick random - (Raffle)</strong></p> <p>Among those who fulfill all the conditions of the event you created, the system automatically determines the winners and alternate winners.</p> <p><strong>I am going to pick winners - (By contest)</strong></p> <p>A 'hashtag' condition must be included in the event you construct. All hashtag-containing tweets sent by participants are given to you for approval. You must choose the winner and alternate winner from among these individuals.</p> <p><em>See Pick Winners for more information.</em></p> <p>Submit your Event for review by clicking the Save button. The event you create will be listed as 'Pending Review' on the Event Management page.</p>"
			},
			{
				id: '4',
				title: 'İncele ve Yayınla',
				title_en: 'Review and Publish',
				content:
					"<p>İnceleme 12 saat içerisinde tamamlanır ve sonucu size bildirilir. İptal edilen etkinlikler tekrar oluşturulamaz. Gerekli düzenlemeleri yaptıktan sonra 'Yeni Etkinlik Ekle' butonuna basarak tekrar etkinlik oluşturabilirsiniz.</p> <p>Etkinliğiniz incelemeden başarı ile geçtikten sonra sizin tarafınızdan yayınlanma sürecine geçer.</p> <p>Oluşturduğunuz etkinlikte;</p> <p><em><strong>'Etkinlik Tweetini daha önce paylaşmadım, canlı olarak yayınlayacağım.' işaretli değil ise,</strong></em> Yayınla butonuna bastıktan sonra etkinliğiniz Vienot mobil uygulamasında hemen görünmeye başlar.</p> <p><strong><em>'Etkinlik Tweetini daha önce paylaşmadım, canlı olarak yayınlayacağım.' işaretli ise, </em></strong>Yayınla butonuna bastıktan sonra karşınıza gelen ekrandan göndereceğiniz tweeti oluşturmalısınız. Tweet içeriğinizde otomatik olarak bir link olacaktır. Bu linki paylaşarak topluluğunuzun etkinliğe hızlıca katılmasını sağlayabilirsiniz. Tweetinizi hazırladıktan sonra Tweetle ve Yayınla butonuna basarak etkinliği başlatabilirsiniz. Bu işlem geri alınamaz.</p> <p>Başlatılan etkinlik, Etkinlik Yönetimi sayfasında 'Devam Ediyor' durumunda listelenir ve belirttiğiniz bitiş tarihine kadar devam eder.</p>",
				content_en:
					"<p>The assessment will be completed in 12 hours, and the results will be emailed to you. Events that have been canceled cannot be reactivated. After making the required adjustments, click the 'Add New Event' button to create a new Event.</p> <p>You initiate the publication process after your event passes the review successfully.</p> <p>The event you create is also;</p> <p><strong>'Event tweet wasn't published yet. Publish live with the event.' if unmarked, </strong>your event will appear in the Vienot mobile app right after you push the Publish button.</p> <p><strong>'Event tweet wasn't published yet. Publish live with the event.' if marked,</strong> use the screen that shows after you click the Publish button to compose the tweet you'll send. A link will be included in the content of your tweet. You may easily enlist the help of your community by sharing this link. After you've finished to create your tweet, press the Tweet and Post button to begin the process. This action is irreversible.</p> <p>The initiated event is listed as 'In Progress' on the Event Management page and continues until the end date you specify.</p>"
			},
			{
				id: '5',
				title: 'Kazananı Belirle',
				title_en: 'Pick Winners',
				content:
					"<p><strong>Kazananı Belirle</strong></p> <p>Etkinliğinizin bitiş tarihi geldiğinde etkinliği sonuçlandırmanız gerekiyor. Bunun için 'Etkinlik Yönetimi' sayfasında ilgili etkinliğin satırında 'Kazananı Belirle' yazısına tıklayın.</p> <p>Etkinliğiniz bir Çekiliş ise 'Kazananı Belirle' butonuna basarak etkinliği tamamlayın.</p> <p>Etkinliğiniz bir Yarışma ise 'Sonuçlara Git' butonuna basın.</p> <p><em><strong>Yarışma Etkinliği Sonuçlandırmak</strong></em></p> <p>Belirttiğiniz hashtag ile Vienot uygulaması üzerinden tweet göndermiş kullanıcıların tüm içeriklerini buradan kategorize edebilirsiniz.</p> <p><strong>İncelenecekler:</strong> Tüm içerikleri bu kategoriden başlayarak kategorize etmeniz gerekiyor. Kriterlerinize uyanları bir üst tura ya da 'Son Tur' kategorisine taşıyabilirsiniz.</p> <p><em><strong>1. Tur:</strong> </em>Tekrar incelemek istediklerinizi bu kategoride gözlemleyerek eleyebilir veya bir üst tura taşıyabilirsiniz.</p> <p><strong>2. Tur: </strong>Kazananları belirlemek için daha keskin kararlar vermeniz gerekiyor. Katılımcıları eleyerek veya 'Son Tur'a taşıyarak devam edebilirsiniz.</p> <p><strong>Son Tur: </strong>Aralarından kazananları seçmeniz gerekiyor. Belirttiğiniz sayıda kazanan ve yedek kazanan seçmek için ilgili kişiyi seçip, kupa simgesine basarak kazananları belirleyin.</p> <p>Son kazananıda seçtikten sonra etkinlik tamamlanmış olacaktır.</p> <p>Bir katılımcıyı, istediğiniz kategoriye taşıyabilirsiniz. Her sayfada maksimum 10 katılımcı listelenir.</p> <p><em><strong>Katılımcılara vaad ettiğiniz tarihlerde sonuçları duyurmayı ve ödülleri vermeyi ihmal etmeyin. Bu konuda topluluğumuzun güvenine fazlasıyla önem verdiğimizi asla unutmayın.</strong></em></p>",
				content_en:
					"<p><strong>Pick Winners</strong></p> <p>When the deadline for your event approaches, you must complete it. To do so, go to the 'Event Management' page and select 'Pick Winners' in the valid event row.</p> <p>If your event is a Raffle, click the 'Pick Winners' button to finish it.</p> <p>Press the 'Go to Results' button if your event is a competition.</p> <p><strong>Concluding the Competition Event</strong></p> <p>With the hashtag you provided, you can categorize all of the material of users who tweeted via the Vienot program.</p> <p><strong>What to review:</strong> You need to categorize all content starting from this category. You can move those who meet your criteria to the next round or to the 'Last Round' category.</p> <p><strong>Round 1:</strong> By observing in this category, you can either delete the ones you wish to re-examine or move them to the next round.</p> <p><strong>Round 2:</strong> To pick the winners, you'll need to make more informed decisions. You can keep going by either eliminating players or moving them to the 'Final Round.'</p> <p><strong>Final Round:</strong> You must pick the winners from among them. Select the relevant person and select the winners by tapping the trophy icon to define the number of winners and alternate winners.</p> <p>The event will be completed once the final winner has been determined.</p> <p>You can move a participant to the category you want. A maximum of 10 participants are listed on each page.</p> <p><em><strong>Don't forget to announce the winners and give the rewards on the dates you promised to the contestants. Never forget that we place a high value on our community's confidence in this regard.</strong></em></p>"
			}
		]
	},
	{
		id: '2',
		title: 'SECOND_MAIN_TITLE',
		path: 'pages/knowledge-base',
		articlesCount: 12,
		featuredArticles: [
			{
				id: '1',
				title: 'Etkinlik Oluşturma Hakkı Nedir?',
				title_en: 'What is the Right to Create an Event?',
				content:
					"<p>Kapalı beta süresince partnerler istedikleri kadar etkinlik oluşturabilirler. Standart olarak beta süresi boyunca tüm partnerler 5 hak ile başlar, haklarınızı bitirmeniz halinde hala kapalı beta süreci devam ediyor ise yeni haklar ücretsiz olarak tanımlanacaktır. </p> <p><em>Beta süreçlerimiz sonrasında bu konuda bazı değişiklikler yaparak sizlerle paylaşacağız.</em></p>",
				content_en:
					"<p>Partners can build as many actions as they desire during the closed beta. During the beta time, all partners are given 5 rights by default; if you finish your rights and if the closed beta process is still ongoing, new rights will be defined free of charge.</p> <p><em>Following our beta testing, we will make some adjustments and share them with you.</em></p>"
			},
	// 		{
	// 			id: '2',
	// 			title: 'Author collaboration',
	// 			title_en: 'Temel Bilgiler',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		},
	// 		{
	// 			id: '3',
	// 			title: 'Exclusivity policy',
	// 			title_en: 'Temel Bilgiler',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		},
	// 		{
	// 			id: '4',
	// 			title: 'Promises you make as an author',
	// 			title_en: 'Temel Bilgiler',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		},
	// 		{
	// 			id: '5',
	// 			title: 'An author’s introduction',
	// 			title_en: 'Temel Bilgiler',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		}
	// 	]
	// },
	// {
	// 	id: '3',
	// 	title: 'Buying',
	// 	path: 'pages/knowledge-base',
	// 	articlesCount: 19,
	// 	featuredArticles: [
	// 		{
	// 			id: '1',
	// 			title: 'Where is my purchase code?',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		},
	// 		{
	// 			id: '2',
	// 			title: 'Can I get a refund?',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		},
	// 		{
	// 			id: '3',
	// 			title: 'Contact us',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		},
	// 		{
	// 			id: '4',
	// 			title: 'How do I purchase an item?',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		},
	// 		{
	// 			id: '5',
	// 			title: "I'm trying to find a specific item",
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		}
	// 	]
	// },
	// {
	// 	id: '4',
	// 	title: 'Item Support',
	// 	path: 'pages/knowledge-base',
	// 	articlesCount: 24,
	// 	featuredArticles: [
	// 		{
	// 			id: '1',
	// 			title: 'What is Item Support?',
	// 			content:
	// 				"<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of 'de Finibus Bonorum et Malorum', written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n"
	// 		},
	// 		{
	// 			id: '2',
	// 			title: 'How to contact an author',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		},
	// 		{
	// 			id: '3',
	// 			title: 'Rating or review removal policy',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		},
	// 		{
	// 			id: '4',
	// 			title: 'Purchasing unsupported items',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		},
	// 		{
	// 			id: '5',
	// 			title: 'Item installation guide',
	// 			content:
	// 				'<p><b>The standard Lorem Ipsum passage, used since the 1500s</b></p>\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna\n    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur\n    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n</p>\n<p><br/><b>Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC</b></p>\n<p>Sed ut perspiciatis unde omnis iste natus error sit\n    voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et\n    quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit\n    aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,\n    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt\n    ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam\n    corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui\n    in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla\n    pariatur?\n</p>\n<p><br/><b>1914 translation by H. Rackham</b></p>\n<p>\n    But I must explain to you how all this mistaken idea of denouncing pleasure\n    and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of\n    the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure\n    itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter\n    consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of\n    itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some\n    great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain\n    some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no\n    annoying consequences, or one who avoids a pain that produces no resultant pleasure?\n</p>\n'
	// 		}
		]
	}
];

function KnowledgeBasePage() {
	const { t } = useTranslation('knowledgeBaseApp');
	const [data, setData] = useState(knowledgeBaseDB);
	const [dialog, setDialog] = useState({
		open: false,
		title: null,
		content: null
	});

	function handleOpenDialog(dialogData) {
		setDialog({
			open: true,
			title: t('CHOOSENLANGUAGE') === 'EN' ? dialogData.title_en : dialogData.title,
			content: t('CHOOSENLANGUAGE') === 'EN' ? dialogData.content_en : dialogData.content,
		});
	}

	return (
		<Root className="w-full">
			<div className="KnowledgeBasePage-header flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-360">
				<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						variant="subtitle1"
						color="inherit"
						className="font-medium opacity-75 mt-16 mx-auto max-w-512"
					>
						{t('TITLE')}
					</Typography>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.1 } }}>
					<Typography color="inherit" className="text-32 sm:text-56 font-bold tracking-tight">
						{t('DESCRIPTION')}
					</Typography>
				</motion.div>
			</div>

			<div>
				{useMemo(() => {
					const container = {
						show: {
							transition: {
								staggerChildren: 0.1
							}
						}
					};

					const item = {
						hidden: { opacity: 0, y: 40 },
						show: { opacity: 1, y: 0 }
					};

					return (
						data.length > 0 && (
							<motion.div
								variants={container}
								initial="hidden"
								animate="show"
								className="flex flex-wrap justify-center max-w-xl w-full mx-auto px-16 sm:px-24 py-32"
							>
								{data.map(category => (
									<motion.div
										variants={item}
										className="max-w-md w-full max-w-512 pb-24 md:w-1/2 md:p-16"
										key={category.id}
									>
										<Card className="rounded-16 shadow">
											<List component="nav" className="p-0 pt-8">
												<Typography className="font-medium pl-32 py-16 text-16">
													{t(category.title)}
												</Typography>

												{category.featuredArticles.map((article, index) => (
													<ListItem
														key={article.id}
														onClick={() => handleOpenDialog(article)}
														className="pl-32"
														button
													>
														<ListItemIcon className="min-w-40">
															<Icon className="text-20">import_contacts</Icon>
														</ListItemIcon>
														<ListItemText primary={t('CHOOSENLANGUAGE') === 'EN' ? article.title_en : article.title} />
													</ListItem>
												))}
											</List>
											{/* <div className="w-full p-24 px-32">
												<Button className="px-24" color="primary" variant="outlined">
													{`See all articles (${category.articlesCount})`}
												</Button>
											</div> */}
										</Card>
									</motion.div>
								))}
							</motion.div>
						)
					);
				}, [data, t])}
			</div>

			{useMemo(() => {
				function handleCloseDialog() {
					setDialog({
						...dialog,
						open: false
					});
				}

				return (
					<Dialog
						open={dialog.open}
						onClose={handleCloseDialog}
						aria-labelledby="knowledge-base-document"
						TransitionComponent={Transition}
					>
						<DialogTitle>
							<Typography className="pt-8 font-medium text-24">{dialog.title}</Typography>
						</DialogTitle>
						<DialogContent>
							<DialogContentText
								className="leading-normal text-14"
								dangerouslySetInnerHTML={{ __html: dialog.content }}
							/>
						</DialogContent>
						<DialogActions className="p-16">
							<Button onClick={handleCloseDialog} color="primary" variant="outlined">
								{t('CLOSE')}
							</Button>
						</DialogActions>
					</Dialog>
				);
			}, [dialog])}
		</Root>
	);
}

export default KnowledgeBasePage;
