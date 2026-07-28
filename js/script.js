// ════════════════════════════════════════════
// TEMA (claro / escuro)
// ════════════════════════════════════════════
function aplicarIconeTema(){
  const theme=document.documentElement.getAttribute('data-theme');
  const btn=document.getElementById('themeToggle');
  if(!btn)return;
  btn.textContent=theme==='dark'?'☀️':'🌙';
  btn.setAttribute('aria-label',theme==='dark'?'Mudar para modo claro':'Mudar para modo escuro');
}

function toggleTheme(){
  const html=document.documentElement;
  const atual=html.getAttribute('data-theme')||'light';
  const novo=atual==='dark'?'light':'dark';
  html.setAttribute('data-theme',novo);
  try{localStorage.setItem('sysmed-theme',novo)}catch(e){}
  aplicarIconeTema();
}

// ════════════════════════════════════════════
// SIDEBAR MOBILE (gaveta)
// ════════════════════════════════════════════
function toggleSidebar(){
  const sb=document.getElementById('sidebar');
  const ov=document.getElementById('sidebar-overlay');
  const btn=document.getElementById('menuToggle');
  const abrindo=!sb.classList.contains('open');
  sb.classList.toggle('open',abrindo);
  ov.classList.toggle('show',abrindo);
  btn.setAttribute('aria-expanded',String(abrindo));
}
function closeSidebar(){
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('show');
  document.getElementById('menuToggle').setAttribute('aria-expanded','false');
}

// ════════════════════════════════════════════
// TOASTS (feedback visual, substitui alert())
// ════════════════════════════════════════════
const TOAST_ICONS={success:'✅',error:'⚠️',info:'ℹ️'};
function showToast(msg,tipo='info',duracao=3200){
  const stack=document.getElementById('toast-stack');
  if(!stack)return;
  const el=document.createElement('div');
  el.className=`toast ${tipo}`;
  el.innerHTML=`<span class="toast-ic">${TOAST_ICONS[tipo]||'ℹ️'}</span><span class="toast-msg">${msg}</span>`;
  stack.appendChild(el);
  setTimeout(()=>{
    el.style.transition='opacity .2s';
    el.style.opacity='0';
    setTimeout(()=>el.remove(),200);
  },duracao);
}

// ════════════════════════════════════════════
// DIÁLOGO DE CONFIRMAÇÃO (substitui confirm())
// ════════════════════════════════════════════
let _confirmCallback=null;
function askConfirm(titulo,mensagem,onConfirm,labelOk='Remover'){
  document.getElementById('confirm-title').textContent=titulo;
  document.getElementById('confirm-msg').textContent=mensagem;
  document.getElementById('confirm-ok-btn').textContent=labelOk;
  _confirmCallback=onConfirm;
  document.getElementById('confirm-overlay').classList.add('show');
}
function confirmAccept(){
  document.getElementById('confirm-overlay').classList.remove('show');
  if(typeof _confirmCallback==='function')_confirmCallback();
  _confirmCallback=null;
}
function confirmCancel(){
  document.getElementById('confirm-overlay').classList.remove('show');
  _confirmCallback=null;
}

// ════════════════════════════════════════════
// DADOS DO SISTEMA
// ════════════════════════════════════════════

const MEDICOS = [
  {id:'M01',nome:'Dr. André Luís Ferreira',crm:'CRM/SP 48201',esp:'Clínica Médica'},
  {id:'M02',nome:'Dra. Beatriz Costa Almeida',crm:'CRM/SP 55312',esp:'Emergência'},
  {id:'M03',nome:'Dr. Carlos Eduardo Mendes',crm:'CRM/SP 61047',esp:'Clínica Médica'},
  {id:'M04',nome:'Dra. Daniela Rocha Lima',crm:'CRM/SP 72193',esp:'Cardiologia'},
  {id:'M05',nome:'Dr. Eduardo Souza Pinto',crm:'CRM/SP 38820',esp:'Emergência'},
  {id:'M06',nome:'Dra. Fernanda Gomes Teixeira',crm:'CRM/SP 44765',esp:'Neurologia'},
  {id:'M07',nome:'Dr. Gustavo Henrique Barros',crm:'CRM/SP 59031',esp:'Clínica Médica'},
  {id:'M08',nome:'Dra. Helena Marques Vieira',crm:'CRM/SP 67284',esp:'Pediatria'},
  {id:'M09',nome:'Dr. Igor Nascimento Castro',crm:'CRM/SP 43118',esp:'Ortopedia'},
  {id:'M10',nome:'Dra. Juliana Pereira Matos',crm:'CRM/SP 70452',esp:'Emergência'},
  {id:'M11',nome:'Dr. Kleber Augusto Ramos',crm:'CRM/SP 52640',esp:'Clínica Médica'},
  {id:'M12',nome:'Dra. Luciana Carvalho Nunes',crm:'CRM/SP 48937',esp:'Ginecologia'},
  {id:'M13',nome:'Dr. Marcelo Figueiredo Silva',crm:'CRM/SP 63501',esp:'Emergência'},
  {id:'M14',nome:'Dra. Natália Andrade Moreira',crm:'CRM/SP 71836',esp:'Cardiologia'},
  {id:'M15',nome:'Dr. Otávio Ribeiro Monteiro',crm:'CRM/SP 39274',esp:'Clínica Médica'},
  {id:'M16',nome:'Dra. Patrícia Lemos Cavalcanti',crm:'CRM/SP 58163',esp:'Neurologia'},
  {id:'M17',nome:'Dr. Rafael Queiroz Santana',crm:'CRM/SP 66720',esp:'Emergência'},
  {id:'M18',nome:'Dra. Sandra Maria Oliveira',crm:'CRM/SP 42895',esp:'Clínica Médica'},
  {id:'M19',nome:'Dr. Thiago Corrêa Bastos',crm:'CRM/SP 74361',esp:'Ortopedia'},
  {id:'M20',nome:'Dra. Valéria Fontes Pinheiro',crm:'CRM/SP 50148',esp:'Emergência'},
];

const PROFISSIONAIS = [
  {id:'P01',nome:'Ana Paula Rodrigues',coren:'COREN/SP 312045',cargo:'Téc. Enfermagem'},
  {id:'P02',nome:'Bruno Alves Machado',coren:'COREN/SP 298761',cargo:'Enfermeiro'},
  {id:'P03',nome:'Carla Fernandes Dias',coren:'COREN/SP 334182',cargo:'Téc. Enfermagem'},
  {id:'P04',nome:'Diego Martins Costa',coren:'COREN/SP 287534',cargo:'Téc. Enfermagem'},
  {id:'P05',nome:'Elaine Souza Borges',coren:'COREN/SP 319847',cargo:'Enfermeira'},
  {id:'P06',nome:'Fábio Gonçalves Lima',coren:'COREN/SP 305612',cargo:'Téc. Enfermagem'},
  {id:'P07',nome:'Gabriela Neves Araújo',coren:'COREN/SP 341290',cargo:'Enfermeira'},
  {id:'P08',nome:'Henrique Moura Santos',coren:'COREN/SP 276438',cargo:'Téc. Enfermagem'},
  {id:'P09',nome:'Isabela Torres Freitas',coren:'COREN/SP 328175',cargo:'Téc. Enfermagem'},
  {id:'P10',nome:'João Victor Pereira',coren:'COREN/SP 293064',cargo:'Téc. Enfermagem'},
  {id:'P11',nome:'Karen Lopes Andrade',coren:'COREN/SP 356901',cargo:'Enfermeira'},
  {id:'P12',nome:'Leonardo Campos Viana',coren:'COREN/SP 281743',cargo:'Téc. Enfermagem'},
  {id:'P13',nome:'Mariana Prado Cunha',coren:'COREN/SP 347826',cargo:'Enfermeira'},
  {id:'P14',nome:'Nilton Ferreira Ramos',coren:'COREN/SP 264519',cargo:'Téc. Enfermagem'},
  {id:'P15',nome:'Olivia Mendes Teixeira',coren:'COREN/SP 332704',cargo:'Téc. Enfermagem'},
  {id:'P16',nome:'Paulo Ricardo Azevedo',coren:'COREN/SP 310388',cargo:'Téc. Enfermagem'},
  {id:'P17',nome:'Queila Barbosa Fonseca',coren:'COREN/SP 298130',cargo:'Enfermeira'},
  {id:'P18',nome:'Rodrigo Melo Cardoso',coren:'COREN/SP 275962',cargo:'Téc. Enfermagem'},
  {id:'P19',nome:'Silvia Nakamura',coren:'COREN/SP 321547',cargo:'Enfermeira'},
  {id:'P20',nome:'Tânia Cristina Brito',coren:'COREN/SP 308419',cargo:'Téc. Enfermagem'},
];

const MEDICACOES = [
  {nome:'Dipirona Sódica',dose:'500 mg/mL Amp 2 mL',via:'IV Direto',obs:'Administrar lentamente em 3 min'},
  {nome:'Tramadol',dose:'50 mg/mL Amp 2 mL',via:'IV em Bomba',obs:'Diluir em 100 mL SF 0,9% — 30 min'},
  {nome:'Ondansetrona',dose:'2 mg/mL Amp 4 mL',via:'IV Direto',obs:'Administrar em 2–5 min'},
  {nome:'Metoclopramida',dose:'5 mg/mL Amp 2 mL',via:'IV Direto',obs:'Administrar em 3 min'},
  {nome:'Ranitidina',dose:'25 mg/mL Amp 2 mL',via:'IV Direto',obs:'Diluir em 20 mL ABD'},
  {nome:'Omeprazol',dose:'40 mg FA',via:'IV em Bomba',obs:'Reconstituir em 100 mL SF 0,9%'},
  {nome:'Dexametasona',dose:'4 mg/mL Amp 2,5 mL',via:'IV Direto',obs:''},
  {nome:'Hidrocortisona',dose:'500 mg FA',via:'IV em Bomba',obs:'Diluir em 100 mL SF 0,9% — 30 min'},
  {nome:'Morfina',dose:'10 mg/mL Amp 1 mL',via:'IV Direto',obs:'Diluir 1:9 em ABD — adm. lenta'},
  {nome:'Cetoprofeno',dose:'100 mg FA',via:'IV em Bomba',obs:'Diluir em 100 mL SF 0,9% — 20 min'},
  {nome:'Tenoxicam',dose:'20 mg FA',via:'IV Direto',obs:'Reconstituir em 2 mL ABD'},
  {nome:'Amoxicilina + Clavulanato',dose:'1 g FA',via:'IV em Bomba',obs:'Diluir em 100 mL SF 0,9% — 30 min'},
  {nome:'Ceftriaxona',dose:'1 g FA',via:'IV em Bomba',obs:'Diluir em 100 mL SF 0,9% — 30 min'},
  {nome:'Ciprofloxacino',dose:'200 mg/100 mL bolsa',via:'IV em Bomba',obs:'60 min — fotossensível'},
  {nome:'Azitromicina',dose:'500 mg FA',via:'IV em Bomba',obs:'Diluir em 250 mL SF 0,9% — 60 min'},
  {nome:'Clindamicina',dose:'150 mg/mL Amp 4 mL',via:'IV em Bomba',obs:'Diluir em 100 mL SF — 30 min'},
  {nome:'Aciclovir',dose:'250 mg FA',via:'IV em Bomba',obs:'Diluir em 100 mL SF — 60 min'},
  {nome:'Metronidazol',dose:'5 mg/mL Bolsa 100 mL',via:'IV em Bomba',obs:'30 min — proteger da luz'},
  {nome:'Furosemida',dose:'10 mg/mL Amp 2 mL',via:'IV Direto',obs:'Administrar em 1–2 min'},
  {nome:'Captopril',dose:'25 mg Comp SL',via:'SL',obs:''},
  {nome:'Atenolol',dose:'50 mg Comp VO',via:'VO',obs:''},
  {nome:'Enalapril',dose:'5 mg Comp VO',via:'VO',obs:''},
  {nome:'Nifedipino',dose:'10 mg Cáps SL',via:'SL',obs:'Uso em crise hipertensiva'},
  {nome:'Amiodarona',dose:'150 mg/3 mL Amp',via:'IV em Bomba',obs:'Diluir 150 mg em 100 mL SG 5% — via exclusiva'},
  {nome:'Adenosina',dose:'3 mg/mL Amp 2 mL',via:'IV Direto',obs:'Bolus rápido — monitorizar ECG'},
  {nome:'Atropina',dose:'0,5 mg/mL Amp 1 mL',via:'IV Direto',obs:'Bolus rápido'},
  {nome:'Adrenalina (Epinefrina)',dose:'1 mg/mL Amp 1 mL',via:'IV Direto',obs:'Emergência — protocolo PCR'},
  {nome:'Noradrenalina',dose:'2 mg/mL Amp 4 mL',via:'IV em Bomba',obs:'Via central — bomba de infusão'},
  {nome:'Dobutamina',dose:'12,5 mg/mL Amp 20 mL',via:'IV em Bomba',obs:'Bomba de infusão — monitorizar'},
  {nome:'Aminofilina',dose:'24 mg/mL Amp 10 mL',via:'IV em Bomba',obs:'Diluir em 100 mL SF — 30 min'},
  {nome:'Brometo de Ipratrópio',dose:'0,25 mg/mL Neb 2 mL',via:'Inalatório',obs:'Nebulizar com 3 mL SF 0,9%'},
  {nome:'Salbutamol',dose:'5 mg/mL Neb 1 mL',via:'Inalatório',obs:'Nebulizar com 3 mL SF 0,9%'},
  {nome:'Fenitoína',dose:'50 mg/mL Amp 5 mL',via:'IV em Bomba',obs:'Máx. 50 mg/min — monitorizar ECG'},
  {nome:'Diazepam',dose:'5 mg/mL Amp 2 mL',via:'IV Direto',obs:'Administrar lentamente — 2 mg/min'},
  {nome:'Midazolam',dose:'5 mg/mL Amp 3 mL',via:'IV Direto',obs:'Titular dose — monitorizar resp.'},
  {nome:'Haloperidol',dose:'5 mg/mL Amp 1 mL',via:'IM',obs:''},
  {nome:'Prometazina',dose:'25 mg/mL Amp 2 mL',via:'IM',obs:'Não administrar IV direto'},
  {nome:'Glicose 50%',dose:'Amp 10 mL',via:'IV Direto',obs:'Hipoglicemia — monitorizar glicemia'},
  {nome:'Glucagon',dose:'1 mg FA',via:'IM',obs:'Reconstituir no diluente fornecido'},
  {nome:'Insulina Regular',dose:'100 UI/mL FA 10 mL',via:'SC',obs:'Monitorizar glicemia 1h após'},
  {nome:'Heparina Sódica',dose:'5.000 UI/mL Amp',via:'SC',obs:''},
  {nome:'Enoxaparina',dose:'40 mg/0,4 mL Ser',via:'SC',obs:'Rodízio de aplicação'},
  {nome:'Ácido Tranexâmico',dose:'100 mg/mL Amp 5 mL',via:'IV em Bomba',obs:'Diluir em 100 mL SF — 10 min'},
  {nome:'Vitamina K (Fitomenadiona)',dose:'10 mg/mL Amp 1 mL',via:'IM',obs:''},
  {nome:'Sulfato de Magnésio',dose:'50% Amp 10 mL',via:'IV em Bomba',obs:'Diluir em 100 mL SF — 20 min'},
  {nome:'Cloreto de Potássio (KCl 19,1%)',dose:'Amp 10 mL',via:'IV em Bomba',obs:'NUNCA IV DIRETO — diluir 40 mEq/L — monitorizar'},
  {nome:'Soro Fisiológico 0,9%',dose:'500 mL Bolsa',via:'IV em Bomba',obs:''},
  {nome:'Soro Glicosado 5%',dose:'500 mL Bolsa',via:'IV em Bomba',obs:''},
  {nome:'Ringer Lactato',dose:'500 mL Bolsa',via:'IV em Bomba',obs:'Reposição volêmica'},
  {nome:'Albumina 20%',dose:'Frasco 50 mL',via:'IV em Bomba',obs:'60 min — monitorizar sinais vitais'},
];

const ALERGIAS = ['NKDA','Dipirona','Penicilina','AAS','AINH','Contraste iodado','Látex','Sulfamídicos','Cefalosporinas','Codeína','NKDA','NKDA','NKDA','Dipirona','NKDA','Penicilina','NKDA','AAS','NKDA','NKDA','NKDA','Látex','NKDA','Morfina','NKDA','NKDA','Dipirona','NKDA','NKDA','Sulfa','NKDA','NKDA','Penicilina','NKDA','NKDA','AAS','NKDA','NKDA','Dipirona','NKDA','NKDA','NKDA','Látex','NKDA','NKDA','NKDA','Sulfamídicos','NKDA','NKDA','NKDA'];

const NOMES_M=['Carlos Eduardo Mendes','José Roberto Lima','Antônio Silva Pereira','Francisco Alves Souza','Luiz Henrique Costa','Paulo Ricardo Ferreira','Marcos Antônio Santos','Rodrigo Oliveira Pinto','Anderson Gomes Barros','Thiago Martins Rocha','Leonardo Carvalho Nunes','Gustavo Pereira Castro','Rafael Araújo Monteiro','Fábio Ribeiro Corrêa','Daniel Nascimento Viana','Bruno Almeida Ramos','Vinícius Torres Fonseca','Alessandro Moreira Campos','Renato Cardoso Braga','Cláudio Dias Melo','Éderson Cunha Borges','Fabrício Lopes Andrade','Henrique Queiroz Brito','Ivan Freitas Cavalcanti','Jonas Barbosa Azevedo'];
const NOMES_F=['Maria Aparecida Lima','Ana Carolina Santos','Francisca Oliveira Costa','Antônia Pereira Rocha','Adriana Souza Ferreira','Juliana Martins Alves','Priscila Gomes Teixeira','Fernanda Carvalho Neves','Patricia Ribeiro Mendes','Simone Araújo Borges','Camila Torres Castro','Larissa Moura Andrade','Vanessa Campos Dias','Cristiane Fonseca Brito','Mariana Nascimento Ramos','Tatiane Cardoso Vieira','Letícia Monteiro Cunha','Bianca Corrêa Freitas','Débora Azevedo Lemos','Elaine Barbosa Melo','Giovanna Queiroz Prado','Sabrina Almeida Nunes','Mônica Viana Cavalcanti','Raquel Braga Fontes','Aline Sousa Lopes'];
const MAES_M=['Maria José Mendes','Joana Lima Pereira','Ana Souza Alves','Rosa Costa Ferreira','Luzia Santos Barros','Terezinha Rocha Lima','Neide Gomes Pinto','Vera Oliveira Santos','Irene Martins Costa','Célia Carvalho Nunes','Regina Pereira Castro','Vera Araújo Monteiro','Carmem Ribeiro Corrêa','Lúcia Nascimento Viana','Aparecida Almeida Ramos','Neuza Torres Fonseca','Benedita Moreira Campos','Dirce Cardoso Braga','Geralda Dias Melo','Helena Cunha Borges','Iracema Lopes Andrade','Josefa Queiroz Brito','Luísa Freitas Cavalcanti','Marta Barbosa Azevedo','Nair Costa Braga'];
const MAES_F=['Francisca Aparecida Lima','Rosa Ana Santos','Luzia Oliveira Costa','Conceição Pereira Rocha','Maria Souza Ferreira','Joana Martins Alves','Neide Gomes Teixeira','Vera Carvalho Neves','Irene Ribeiro Mendes','Célia Araújo Borges','Regina Torres Castro','Carmem Moura Andrade','Lúcia Campos Dias','Aparecida Fonseca Brito','Neuza Nascimento Ramos','Benedita Cardoso Vieira','Dirce Monteiro Cunha','Geralda Corrêa Freitas','Helena Azevedo Lemos','Iracema Barbosa Melo','Josefa Queiroz Prado','Luísa Almeida Nunes','Marta Viana Cavalcanti','Nair Braga Fontes','Odete Sousa Lopes'];
const QUEIXAS=['Dor abdominal intensa','Cefaleia com tontura','Dispneia e taquicardia','Febre alta e calafrios','Dor torácica precordial','Crise hipertensiva','Vômitos e diarreia','Trauma em membro superior','Lombalgia aguda intensa','Crise convulsiva','Hipoglicemia sintomática','Crise asmática grave','Urticária e angioedema','IAM — protocolo ativado','Sepse — protocolo ativado'];
const LEITOS=['PA-01','PA-02','PA-03','PA-04','PA-05','PA-06','PA-07','PA-08','PA-09','PA-10','Obs-A','Obs-B','Obs-C','Reani-01','Reani-02'];
const CONVENIOS=['SUS','SUS','SUS','SUS','SUS','SUS','Unimed','Bradesco Saúde','SulAmérica','Amil','Hapvida','SUS','SUS','SUS','Particular','SUS','SUS','Unimed','SUS','SUS','SUS','SUS','Bradesco Saúde','SUS','SUS','SUS','SUS','SUS','SUS','Unimed','SUS','SUS','SUS','SUS','SUS','Hapvida','SUS','SUS','SUS','SUS','SUS','SUS','SUS','SUS','SUS','SUS','SUS','SUS','SUS','SUS'];
const ANTECEDENTES=['HAS, DM2','Sem comorbidades','HAS','Sem comorbidades','DM2, obesidade','Tabagismo, DPOC','Etilismo','Sem comorbidades','HAS, IRC','Sem comorbidades','Cardiopatia isquêmica','Sem comorbidades','HAS, DM2, obeso','Asma brônquica','Sem comorbidades','Epilepsia','HAS','Sem comorbidades','DM2','Hipotireoidismo','Sem comorbidades','HAS, FA','Sem comorbidades','Gestante 28sem','Sem comorbidades','HAS, DM2','IRC estágio 3','Sem comorbidades','DPOC, tabagismo','Sem comorbidades','HAS','Sem comorbidades','DM2','Sem comorbidades','Cirrose hepática','HAS','Sem comorbidades','DM1','Sem comorbidades','HAS, obesidade','Sem comorbidades','DM2, neuropatia','Sem comorbidades','HAS','Sem comorbidades','Epilepsia','Sem comorbidades','HAS, DM2','Sem comorbidades','FA, anticoagulado'];

function gerarCPF(){const r=()=>Math.floor(Math.random()*9);let d=[r(),r(),r(),r(),r(),r(),r(),r(),r()];let s1=d.slice(0,9).reduce((a,v,i)=>{return a+(10-i)*v},0)%11;let c1=s1<2?0:11-s1;d.push(c1);let s2=d.slice(0,10).reduce((a,v,i)=>{return a+(11-i)*v},0)%11;let c2=s2<2?0:11-s2;d.push(c2);return `${d[0]}${d[1]}${d[2]}.${d[3]}${d[4]}${d[5]}.${d[6]}${d[7]}${d[8]}-${d[9]}${d[10]}`}

function gerarNasc(minA,maxA){const a=minA+Math.floor(Math.random()*(maxA-minA));const d=new Date();d.setFullYear(d.getFullYear()-a);d.setMonth(Math.floor(Math.random()*12));d.setDate(1+Math.floor(Math.random()*28));return d.toISOString().split('T')[0]}

function gerarAtend(){return String(1700000+Math.floor(Math.random()*99999))}

function fmtData(v){if(!v)return '—';const[y,m,d]=v.split('-');return `${d}/${m}/${y}`}

// ════════════════════════════════════════════
// PROTOCOLO DE MANCHESTER
// ════════════════════════════════════════════
const MANCHESTER=[
  {id:'vermelho',nome:'Vermelho',sub:'Emergência',      desc:'Risco iminente de morte.',                     tempoLabel:'Atendimento imediato',   peso:2},
  {id:'laranja', nome:'Laranja', sub:'Muito urgente',   desc:'Quadro grave, pode se agravar rapidamente.',   tempoLabel:'Até 10 minutos',         peso:7},
  {id:'amarelo', nome:'Amarelo', sub:'Urgente',         desc:'Avaliação rápida — sem risco imediato de morte.',tempoLabel:'Até 60 minutos',       peso:31},
  {id:'verde',   nome:'Verde',   sub:'Pouco urgente',   desc:'Caso leve, pode aguardar com segurança.',      tempoLabel:'Até 120 minutos',        peso:38},
  {id:'azul',    nome:'Azul',    sub:'Não urgente',     desc:'Caso simples, tratável em unidade básica.',    tempoLabel:'Até 240 minutos',        peso:22},
];
const MC_ORDEM=MANCHESTER.map(m=>m.id);

function sortearClassificacao(){
  const total=MANCHESTER.reduce((a,m)=>a+m.peso,0);
  let r=Math.random()*total;
  for(const m of MANCHESTER){ if(r<m.peso) return m.id; r-=m.peso; }
  return 'azul';
}
function getManchester(id){return MANCHESTER.find(m=>m.id===id)||MANCHESTER[3]}

function mcChipHTML(id){
  const m=getManchester(id);
  return `<span class="mc-chip mc-${m.id}" title="${m.desc}"><span class="mc-dot"></span>${m.nome} · ${m.sub}</span>`;
}

// Gera 50 pacientes
const PACIENTES=[];
for(let i=0;i<50;i++){
  const fem=Math.random()<.5;
  const nomesArr=fem?NOMES_F:NOMES_M;
  const maesArr=fem?MAES_F:MAES_M;
  const idx=i<25?i:(i-25);
  const medIdx=Math.floor(Math.random()*MEDICOS.length);
  const entradaTs=Date.now()-Math.random()*8*3600000;
  PACIENTES.push({
    id:`PAC${String(i+1).padStart(3,'0')}`,
    nome:nomesArr[idx]||(fem?NOMES_F[0]:NOMES_M[0]),
    mae:maesArr[idx]||(fem?MAES_F[0]:MAES_M[0]),
    sexo:fem?'Feminino':'Masculino',
    nascimento:gerarNasc(18,85),
    cpf:gerarCPF(),
    atendimento:gerarAtend(),
    medico:MEDICOS[medIdx],
    leito:LEITOS[i%LEITOS.length],
    queixa:QUEIXAS[i%QUEIXAS.length],
    convenio:CONVENIOS[i],
    alergia:ALERGIAS[i],
    antecedentes:ANTECEDENTES[i],
    peso:`${45+Math.floor(Math.random()*75)} kg`,
    entrada:new Date(entradaTs).toISOString().split('T')[0],
    entradaTs,
    classificacao:sortearClassificacao(),
    prescricoes:[]
  });
}

// ════════════════════════════════════════════
// ESTADO
// ════════════════════════════════════════════
let pacAtual=null;

// ════════════════════════════════════════════
// RENDER LISTA
// ════════════════════════════════════════════
let filtroClassificacao=null;

function filtrarClassificacao(id,btn){
  filtroClassificacao=id;
  document.querySelectorAll('.mc-filter-btn').forEach(b=>{
    b.classList.toggle('active',b===btn);
    b.setAttribute('aria-pressed',String(b===btn));
  });
  renderLista(document.getElementById('searchInput').value);
}

function renderLista(filtro=''){
  const el=document.getElementById('patient-list');
  let lista=PACIENTES.filter(p=>p.nome.toLowerCase().includes(filtro.toLowerCase())||p.id.includes(filtro));
  if(filtroClassificacao) lista=lista.filter(p=>p.classificacao===filtroClassificacao);
  // fila real: mais grave primeiro; empate = quem chegou antes
  lista=lista.slice().sort((a,b)=>MC_ORDEM.indexOf(a.classificacao)-MC_ORDEM.indexOf(b.classificacao)||a.entradaTs-b.entradaTs);

  const countEl=document.getElementById('patient-count');
  if(countEl)countEl.textContent=lista.length;

  if(!lista.length){
    el.innerHTML=`<div class="search-empty">Nenhum paciente encontrado${filtro?` para "${filtro}"`:''}.</div>`;
    return;
  }

  el.innerHTML=lista.map(p=>{
    const ini=p.nome.split(' ').slice(0,2).map(w=>w[0]).join('').toUpperCase();
    const fem=p.sexo==='Feminino';
    const ativo=pacAtual?.id===p.id;
    const mc=getManchester(p.classificacao);
    const al=p.alergia!=='NKDA'?`<span class="pat-badge badge-red">ALG</span>`:
              p.prescricoes.length?`<span class="pat-badge badge-green">RX:${p.prescricoes.length}</span>`:
              `<span class="pat-badge badge-amber">${p.leito}</span>`;
    return `<div class="patient-item${ativo?' active':''}" role="option" aria-selected="${ativo}" tabindex="0"
      onclick="selecionarPac('${p.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selecionarPac('${p.id}')}">
      <span class="mc-bar mc-${mc.id}" title="${mc.nome} — ${mc.sub}: ${mc.desc}"></span>
      <div class="pat-avatar${fem?' f':''}">${ini}</div>
      <div class="pat-info">
        <div class="pat-name">${p.nome}</div>
        <div class="pat-sub">${p.id} · ${fmtData(p.nascimento)}</div>
      </div>
      ${al}
    </div>`;
  }).join('');
}

function filtrarPacientes(){renderLista(document.getElementById('searchInput').value)}

// ════════════════════════════════════════════
// SELECIONAR PACIENTE
// ════════════════════════════════════════════
function selecionarPac(id){
  pacAtual=PACIENTES.find(p=>p.id===id);
  renderLista(document.getElementById('searchInput').value);
  preencherDados();
  preencherSelects();
  renderRxLists();
  renderEtiq();
  limparErros();
  if(window.innerWidth<=860)closeSidebar();
}

function preencherDados(){
  if(!pacAtual)return;
  const p=pacAtual;
  document.getElementById('chip-atend').textContent=p.id;
  const mc=getManchester(p.classificacao);
  const chipMc=document.getElementById('chip-manchester');
  if(chipMc){
    chipMc.className=`mc-chip mc-${mc.id}`;
    chipMc.title=mc.desc;
    chipMc.innerHTML=`<span class="mc-dot"></span>${mc.nome} · ${mc.sub}`;
  }
  document.getElementById('d-nome').textContent=p.nome;
  document.getElementById('d-mae').textContent=p.mae;
  document.getElementById('d-nasc').textContent=fmtData(p.nascimento);
  document.getElementById('d-cpf').textContent=p.cpf;
  document.getElementById('d-convenio').textContent=p.convenio;
  document.getElementById('d-sexo').textContent=p.sexo;
  document.getElementById('d-peso').textContent=p.peso;
  const alEl=document.getElementById('d-alergia');
  alEl.textContent=p.alergia;
  alEl.className='info-value '+(p.alergia==='NKDA'?'ok':'alert');
  document.getElementById('d-antecedentes').textContent=p.antecedentes;
  document.getElementById('d-atend').textContent=p.atendimento;
  document.getElementById('d-entrada').textContent=fmtData(p.entrada);
  document.getElementById('d-medico').textContent=p.medico.nome+' · '+p.medico.crm;
  document.getElementById('d-leito').textContent=p.leito;
  document.getElementById('d-queixa').textContent=p.queixa;
  const mcField=document.getElementById('d-manchester');
  if(mcField){
    mcField.innerHTML=`${mcChipHTML(p.classificacao)} <span class="mc-meta">Meta de atendimento: ${mc.tempoLabel} · ${mc.desc}</span>`;
  }
}

// ════════════════════════════════════════════
// SELECTS (médicos, profissionais, medicações)
// ════════════════════════════════════════════
function preencherSelects(){
  // Médico na prescrição
  const selMed=document.getElementById('p-medico-rx');
  selMed.innerHTML=MEDICOS.map(m=>`<option value="${m.id}">${m.nome} (${m.esp})</option>`).join('');
  if(pacAtual) selMed.value=pacAtual.medico.id;

  // Profissional prescrição
  const selProf=document.getElementById('p-prof-rx');
  selProf.innerHTML=PROFISSIONAIS.map(p=>`<option value="${p.id}">${p.nome} — ${p.cargo}</option>`).join('');

  // Profissional etiqueta
  const selProfE=document.getElementById('e-prof');
  selProfE.innerHTML=PROFISSIONAIS.map(p=>`<option value="${p.id}">${p.nome} — ${p.cargo}</option>`).join('');

  // Medicações prescrição
  const selMed2=document.getElementById('p-med');
  selMed2.innerHTML='<option value="">— Selecione —</option>'+
    MEDICACOES.map((m,i)=>`<option value="${i}">${m.nome}</option>`).join('');
}

function autoFillMed(){
  const idx=document.getElementById('p-med').value;
  if(idx==='')return;
  const m=MEDICACOES[idx];
  document.getElementById('p-dose').value=m.dose;
  document.getElementById('p-via').value=m.via;
  document.getElementById('p-obs').value=m.obs;
}

// ════════════════════════════════════════════
// PRESCRIÇÕES
// ════════════════════════════════════════════
function limparErros(){
  document.querySelectorAll('.f-group.f-error').forEach(el=>el.classList.remove('f-error'));
}

function adicionarRx(){
  if(!pacAtual){showToast('Selecione um paciente na lista antes de prescrever.','error');return}

  limparErros();
  let valido=true;
  const midx=document.getElementById('p-med').value;
  const dose=document.getElementById('p-dose').value.trim();

  if(midx===''){document.getElementById('fg-med').classList.add('f-error');valido=false}
  if(!dose){document.getElementById('fg-dose').classList.add('f-error');valido=false}

  if(!valido){showToast('Preencha os campos obrigatórios destacados.','error');return}

  const med=MEDICACOES[midx];
  const medId=document.getElementById('p-medico-rx').value;
  const profId=document.getElementById('p-prof-rx').value;
  const medico=MEDICOS.find(m=>m.id===medId);
  const prof=PROFISSIONAIS.find(p=>p.id===profId);
  const rx={
    id:Date.now(),
    med:med.nome,
    dose:dose||med.dose,
    via:document.getElementById('p-via').value,
    freq:document.getElementById('p-freq').value,
    obs:document.getElementById('p-obs').value,
    medico,prof,
    data:new Date().toISOString().split('T')[0],
    hora:new Date().toTimeString().slice(0,5)
  };
  pacAtual.prescricoes.push(rx);
  renderRxLists();
  renderEtiq();
  // limpar
  document.getElementById('p-med').value='';
  document.getElementById('p-dose').value='';
  document.getElementById('p-obs').value='';
  showToast(`${med.nome} adicionada à prescrição de ${pacAtual.nome.split(' ')[0]}.`,'success');
}

function removerRx(rxId){
  if(!pacAtual)return;
  const rx=pacAtual.prescricoes.find(r=>r.id===rxId);
  if(!rx)return;
  askConfirm(
    'Remover prescrição?',
    `Isso vai remover "${rx.med} — ${rx.dose}" da lista de prescrições de ${pacAtual.nome}. Essa ação não pode ser desfeita.`,
    ()=>{
      pacAtual.prescricoes=pacAtual.prescricoes.filter(r=>r.id!==rxId);
      renderRxLists();
      renderEtiq();
      showToast('Prescrição removida.','info');
    }
  );
}

function renderRxLists(){
  if(!pacAtual)return;
  const rxs=pacAtual.prescricoes;
  document.getElementById('rx-count').textContent=rxs.length;

  const html=rxs.length?rxs.map(r=>`
    <div class="rx-item">
      <div class="rx-icon">💊</div>
      <div class="rx-detail">
        <div class="rx-med">${r.med} — ${r.dose}</div>
        <div class="rx-sub">Via: ${r.via} · ${r.freq} · Dr(a). ${r.medico.nome.split(' ')[1]} · ${r.data}</div>
      </div>
      <div class="rx-actions">
        <button class="btn-sm btn-blue" onclick="usarRxEtiq(${r.id})">Etiqueta</button>
        <button class="btn-sm btn-gray" onclick="removerRx(${r.id})">✕</button>
      </div>
    </div>`).join('')
    :'<div style="color:var(--gray-400);font-size:.75rem">Nenhuma prescrição cadastrada.</div>';

  document.getElementById('rx-list-full').innerHTML=html;
  document.getElementById('rx-list-view').innerHTML=rxs.length?rxs.map(r=>`
    <div class="rx-item">
      <div class="rx-icon">💊</div>
      <div class="rx-detail">
        <div class="rx-med">${r.med} — ${r.dose}</div>
        <div class="rx-sub">Via: ${r.via} · ${r.freq}</div>
      </div>
    </div>`).join('')
    :'<div style="color:var(--gray-400);font-size:.75rem">Nenhuma prescrição ativa.</div>';

  // select na aba etiqueta
  const sel=document.getElementById('e-rx-sel');
  sel.innerHTML='<option value="">— Selecione a medicação —</option>'+
    rxs.map(r=>`<option value="${r.id}">${r.med} — ${r.dose} (${r.via})</option>`).join('');
}

function prepararImpressao(){
  if(!pacAtual){showToast('Selecione um paciente primeiro.','error');return}
  limparErros();
  let valido=true;

  if(!document.getElementById('e-prof').value){
    document.getElementById('fg-eprof').classList.add('f-error');
    valido=false;
  }
  if(!pacAtual.prescricoes.length){
    showToast('Este paciente ainda não possui prescrições cadastradas.','error');
    valido=false;
  }else if(!document.getElementById('e-rx-sel').value){
    showToast('Selecione qual prescrição vai na etiqueta.','error');
    valido=false;
  }

  if(!valido)return;
  window.print();
}

function usarRxEtiq(rxId){
  showTab('etiqueta');
  const sel=document.getElementById('e-rx-sel');
  sel.value=rxId;
  selecionarRxEtiq();
}

function selecionarRxEtiq(){renderEtiq()}

// ════════════════════════════════════════════
// RENDER ETIQUETA
// ════════════════════════════════════════════
function renderEtiq(){
  if(!pacAtual){
    document.getElementById('e-nome').textContent='NOME DO PACIENTE';
    ['e-mae','e-nasc','e-leito','e-alg','e-med','e-data-v','e-hora-v','e-medico-v','e-via-v','e-prof-v','e-atend'].forEach(id=>{
      document.getElementById(id).textContent='—';
    });
    return;
  }
  const p=pacAtual;
  document.getElementById('e-atend').textContent=p.atendimento;
  document.getElementById('e-nome').textContent=p.nome.toUpperCase();
  document.getElementById('e-mae').textContent=p.mae;
  document.getElementById('e-nasc').textContent=fmtData(p.nascimento);
  document.getElementById('e-leito').textContent=p.leito;

  // Alergia
  const alEl=document.querySelector('.e-alg');
  document.getElementById('e-alg').textContent=p.alergia;
  if(p.alergia!=='NKDA'){
    alEl.style.background='#fee2e2';alEl.style.borderColor='#fca5a5';
    document.getElementById('e-alg').style.color='#dc2626';
    document.querySelector('.e-alg .al').style.color='#dc2626';
  }else{
    alEl.style.background='#dcfce7';alEl.style.borderColor='#86efac';
    document.getElementById('e-alg').style.color='#16a34a';
    document.querySelector('.e-alg .al').style.color='#16a34a';
  }

  // Prescrição selecionada
  const rxId=parseInt(document.getElementById('e-rx-sel').value);
  const rx=p.prescricoes.find(r=>r.id===rxId);
  if(rx){
    document.getElementById('e-med').textContent=`${rx.med} ${rx.dose}`;
    document.getElementById('e-via-v').textContent=rx.via;
    document.getElementById('e-medico-v').textContent=rx.medico.nome.split(' ').slice(0,2).join(' ');
  }else{
    document.getElementById('e-med').textContent=p.prescricoes.length?'Selecione a prescrição →':'Nenhuma prescrição';
    document.getElementById('e-via-v').textContent='—';
    document.getElementById('e-medico-v').textContent=p.medico.nome.split(' ').slice(0,2).join(' ');
  }

  // Data/hora
  const dt=document.getElementById('e-data').value;
  const hr=document.getElementById('e-hora').value;
  document.getElementById('e-data-v').textContent=dt?fmtData(dt):'—';
  document.getElementById('e-hora-v').textContent=hr||'—';

  // Profissional
  const profId=document.getElementById('e-prof').value;
  const prof=PROFISSIONAIS.find(pr=>pr.id===profId);
  document.getElementById('e-prof-v').textContent=prof?`${prof.nome} · ${prof.coren}`:'';
}

// ════════════════════════════════════════════
// TABS
// ════════════════════════════════════════════
const TAB_ORDER=['dados','prescricao','etiqueta'];

function tabKeydown(ev,t){
  if(ev.key==='Enter'||ev.key===' '){ev.preventDefault();showTab(t);return}
  const i=TAB_ORDER.indexOf(t);
  if(ev.key==='ArrowRight'){ev.preventDefault();const n=TAB_ORDER[(i+1)%TAB_ORDER.length];showTab(n);document.querySelectorAll('.tab')[TAB_ORDER.indexOf(n)].focus()}
  if(ev.key==='ArrowLeft'){ev.preventDefault();const n=TAB_ORDER[(i-1+TAB_ORDER.length)%TAB_ORDER.length];showTab(n);document.querySelectorAll('.tab')[TAB_ORDER.indexOf(n)].focus()}
}

function showTab(t){
  document.querySelectorAll('.tab').forEach((el,i)=>{
    const ativa=TAB_ORDER[i]===t;
    el.classList.toggle('active',ativa);
    el.setAttribute('aria-selected',String(ativa));
  });
  const content=document.getElementById('content');

  if(t==='dados'){
    content.style.gridTemplateColumns='1fr 1fr';
    document.getElementById('tab-dados').style.display='';
    document.getElementById('tab-dados-right').style.display='';
    document.getElementById('tab-prescricao').style.display='none';
    document.getElementById('tab-etiqueta').style.display='none';
  }else if(t==='prescricao'){
    content.style.gridTemplateColumns='1fr';
    document.getElementById('tab-dados').style.display='none';
    document.getElementById('tab-dados-right').style.display='none';
    document.getElementById('tab-prescricao').style.display='';
    document.getElementById('tab-etiqueta').style.display='none';
  }else{
    content.style.gridTemplateColumns='1fr 1fr';
    document.getElementById('tab-dados').style.display='none';
    document.getElementById('tab-dados-right').style.display='none';
    document.getElementById('tab-prescricao').style.display='none';
    document.getElementById('tab-etiqueta').style.display='';
  }
}

// ════════════════════════════════════════════
// RELÓGIO
// ════════════════════════════════════════════
function atualizarRelogio(){
  document.getElementById('clock').textContent=new Date().toLocaleTimeString('pt-BR');
}
setInterval(atualizarRelogio,1000);atualizarRelogio();

// ════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════
(function init(){
  aplicarIconeTema();
  renderLista();
  preencherSelects();
  // preenche data/hora padrão
  const hoje=new Date().toISOString().split('T')[0];
  document.getElementById('e-data').value=hoje;
  document.getElementById('e-hora').value=new Date().toTimeString().slice(0,5);
  // seleciona primeiro paciente
  selecionarPac(PACIENTES[0].id);

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      confirmCancel();
      closeSidebar();
    }
  });

  // limpa destaque de erro assim que o usuário corrige o campo
  document.getElementById('content').addEventListener('input',e=>{
    const fg=e.target.closest('.f-group');
    if(fg)fg.classList.remove('f-error');
  });
  document.getElementById('content').addEventListener('change',e=>{
    const fg=e.target.closest('.f-group');
    if(fg)fg.classList.remove('f-error');
  });
})();