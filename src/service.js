import axios from 'axios'
import dataUrl from './enviroment'

export async function getTournament(slug, token) {
  const response = await axios.request({
    method: 'get',
    url: `${dataUrl.url}/organizers/${slug}/tournaments?limit=10000`,
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data.results
}

export async function login(data) {
  const response = await axios.request({
    method: 'post',
    url: `${dataUrl.url}/auth/login`,
    headers: { 'Content-Type': 'application/json' },
    data
  })
  return response.data
}

export async function createTeam(data, slug, tournamentId, token) {
  const response = await axios.request({
    method: 'post',
    url: `${dataUrl.url}/organizers/${slug}/tournaments/${tournamentId}/teams`,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    data: data
  })
  return response.data.results
}
