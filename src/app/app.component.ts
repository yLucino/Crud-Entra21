import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/models/produto.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  produtos!: Produto[];

  pudutoInput: Produto = {
    id: "",
    title: '',
    subtitle: '',
    description: '',
    value: 0,
    imgLink: ''
  }

  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getProdutos();
  }

  async getProdutos() {
    try {
      const response = await axios.get<Produto[]>("http://localhost:3000/produtos");
      this.produtos = response.data;
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      this.toastr.error('Ocorreu um erro.', 'Erro');
    }
  }

  async postProduto() {
    try {
      const response = await axios.post<Produto>("http://localhost:3000/produtos", this.pudutoInput);
      this.getProdutos();
      this.toastr.success('Operação realizada com sucesso!', 'Sucesso');
    } catch (err) {
      console.log('ERRO:', err);
      this.toastr.error('Ocorreu um erro.', 'Erro');
    }
  }

  async editarProduto(prodId: string) {
    // implementar
  }

  async excluirProduto(prodId: string) {
    try {
      const response = await axios.delete<Produto>(`http://localhost:3000/produtos/${prodId}`);
      this.getProdutos();
      this.toastr.success('Operação realizada com sucesso!', 'Sucesso');
    } catch (err) {
      console.log('ERRO:', err);
      this.toastr.error('Ocorreu um erro.', 'Erro');
    }
  }
}
